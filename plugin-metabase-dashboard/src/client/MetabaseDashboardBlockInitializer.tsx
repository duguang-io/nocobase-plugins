//packages\plugins\@dgtech\plugin-metabase-dashboard\src\client\MetabaseDashboardBlockInitializer.tsx
import { PicRightOutlined } from '@ant-design/icons';
import { SchemaInitializerItem, useSchemaInitializer, useSchemaInitializerItem } from '@nocobase/client';
import React from 'react';

export const MetabaseDashboardBlockInitializer = () => {
  const { insert } = useSchemaInitializer();
  const itemConfig = useSchemaInitializerItem();
  return (
    <SchemaInitializerItem
      {...itemConfig}
      icon={<PicRightOutlined />}
      onClick={() => {
        insert({
          type: 'void',
          'x-settings': 'blockSettings:metabaseDashboard',
          'x-decorator': 'BlockItem',
          'x-decorator-props': {
            name: 'metabase-dashboard',
          },
          'x-component': 'MetabaseDashboard', 
          'x-component-props': {
            
          },
        });
      }}
    />
  );
};
