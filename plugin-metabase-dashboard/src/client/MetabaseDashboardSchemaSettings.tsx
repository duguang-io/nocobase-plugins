// src/plugins/metabase-dashboard/client/schemaSettings.ts

import { SchemaSettings, SchemaSettingsBlockHeightItem, useAPIClient, useDesignable } from '@nocobase/client';
import { ISchema, useField, useFieldSchema } from '@formily/react';
import { uid } from '@formily/shared';

import { useT } from './locale/index';



const commonOptions: any = {
  items: [
    {
      name: 'EditDashboard',
      type: 'modal',
      useComponentProps() {
        const field = useField();
        const fieldSchema = useFieldSchema();
        const api = useAPIClient();
        const { dn } = useDesignable();

        const onSubmit = async (values: any) => {
          const { dashboardId, mode } = values;
          
          const existingRecordId = fieldSchema['x-component-props']?.dashboardRecordId;
          
          let record;
          if (existingRecordId) {
            
            const { data } = await api.resource('metabaseDashboard').update({
              filterByTk: existingRecordId,
              values: { dashboardId, mode },
            });
            record = data?.data?.[0] || { id: existingRecordId };
          } else {
           
            const { data } = await api.resource('metabaseDashboard').create({
              values: { dashboardId, mode },
            });
            record = data?.data;
          }

          
          fieldSchema['x-component-props'] = {
            ...fieldSchema['x-component-props'],
            dashboardRecordId: record.id,
          };
          
          field.componentProps = fieldSchema['x-component-props'];

         
          field.data = { v: uid() };

         
          dn.emit('patch', {
            schema: {
              'x-uid': fieldSchema['x-uid'],
              'x-component-props': fieldSchema['x-component-props'],
            },
          });
        };

        
        const asyncGetInitialValues = async () => {
          const existingRecordId = fieldSchema['x-component-props']?.dashboardRecordId;
          if (!existingRecordId) {
            return { dashboardId: '' };
          }
          const { data } = await api.resource('metabaseDashboard').get({
            filterByTk: existingRecordId,
          });
          return { dashboardId: data?.data?.dashboardId || '' };
        };
        const t = useT();
        return {
          title: t('Edit Metabase Embed'),
          asyncGetInitialValues,
          schema: {
            type: 'object',
            properties: {
              dashboardId: {
                title: t('Resource ID'),
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                required: true,
              },
              mode: {
                title: t('Mode'),
                'x-component': 'Radio.Group',
                'x-decorator': 'FormItem',
                required: true,
                default: 'dashboard',
                enum: [
                  { value: 'dashboard', label: t('Dashboard') },
                  { value: 'question', label: t('Question') },
                ],
              },
            },
          } as ISchema,
          onSubmit,
          noRecord: true,
        };
      },
    },
    {
      name: 'setTheBlockHeight',
      Component: SchemaSettingsBlockHeightItem,
    },
    {
      name: 'divider',
      type: 'divider',
    },
    {
      name: 'delete',
      type: 'remove',
      useComponentProps() {
        return {
          removeParentsIfNoChildren: true,
          breakRemoveOn: {
            'x-component': 'Grid',
          },
        };
      },
    },
  ],
};

export const metabaseDashboardSchemaSettings = new SchemaSettings({
  name: 'blockSettings:metabaseDashboard',
  ...commonOptions,
});
