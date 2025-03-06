import React, { useMemo } from 'react';
import { createForm } from '@formily/core';
import { useForm } from '@formily/react';
import { uid } from '@formily/shared';
import {
  ActionProps,
  ISchema,
  useCollection,
  useCollectionRecordData,
  useDataBlockResource,
  ExtendCollectionsProvider,
  SchemaComponent,
} from '@nocobase/client';
import { usePluginSettingsFormRequest } from './PluginSettingsFormProvider';
import { App as AntdApp } from 'antd';

import {useT} from '../locale/index';

/**
 * 定义 metabaseDashboardConfiguration collection:
 *  - baseUrl
 *  - secretKey
 */


const metabaseDashboardConfigCollection = {
  name: 'metabaseDashboardConfiguration',
  filterTargetKey: 'id',
  fields: [
    {
      type: 'string',
      name: 'baseUrl',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'Base URL',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'secretKey',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: 'Secret Key',
        required: true,
        'x-component': 'Password',
      },
    },
  ],
};

/**
 * 使用 SchemaComponent + DataBlockProvider
 * 让用户编辑 metabaseDashboardConfiguration 表中的记录
 */
const schema = (t : any ): ISchema => ({
  type: 'void',
  name: uid(),
  'x-component': 'CardItem',
  'x-decorator': 'DataBlockProvider',
  'x-decorator-props': {
    collection: metabaseDashboardConfigCollection.name,
    action: 'get',
  },
  properties: {
    form: {
      type: 'void',
      'x-component': 'FormV2',
      'x-use-component-props': 'useFormBlockProps',
      properties: {
        baseUrl: {
          title: t('Base URL'),
          'x-decorator': 'FormItem',
          'x-component': 'CollectionField',
        },
        secretKey: {
          title: t('Secret Key'),
          'x-decorator': 'FormItem',
          'x-component': 'CollectionField',
        },
        footer: {
          type: 'void',
          'x-component': 'Action',
          title: t('Submit'),
          'x-use-component-props': 'useSubmitActionProps',
        },
      },
    },
  },
});

/**
 * 让表单初始值 = DataBlockProvider 提供的 recordData
 */
const useFormBlockProps = () => {
  const recordData = useCollectionRecordData();
  const form = useMemo(
    () =>
      createForm({
        initialValues: recordData,
      }),
    [recordData],
  );
  return { form };
};

/**
 * 点击提交时, updateOrCreate 到 metabaseDashboardConfiguration 表
 */
const useSubmitActionProps = (): ActionProps => {
  const form = useForm();
  const { message } = AntdApp.useApp();
  const collection = useCollection();
  
  const resource = useDataBlockResource();
  const globalSettingsFormRequest = usePluginSettingsFormRequest();

  const t = useT();

  return {
    type: 'primary',
    htmlType: 'submit',
    async onClick() {
      await form.submit();
      const values = form.values;
      console.log('values', values);
      await resource.updateOrCreate({
        values: { ...values, id: 1 },  // 确保 `id=1` 作为参数传入
        filterKeys: ['id'],                 // 这里指定 `id=1` 作为查询条件
      });
      // 刷新 context
      await globalSettingsFormRequest.runAsync();
      message.success(t('Saved successfully'));
    },
  };
};

export const PluginSettingsForm = () => {
  const t = useT();
  return (
    <ExtendCollectionsProvider collections={[metabaseDashboardConfigCollection]}>
      <SchemaComponent schema={schema(t)} scope={{ useFormBlockProps, useSubmitActionProps,t }} />
    </ExtendCollectionsProvider>
  );
};
