// MetabaseDashboardBlockProvider.tsx
import React from 'react';
import { SchemaComponentOptions } from '@nocobase/client';
import { MetabaseDashboard } from './MetabaseDashboard';
import { MetabaseDashboardBlockInitializer } from './MetabaseDashboardBlockInitializer';

export const MetabaseDashboardBlockProvider = (props: any) => {
  return (
    <SchemaComponentOptions
      components={{
        MetabaseDashboard,
        MetabaseDashboardBlockInitializer,
      }}
    >
      {props.children}
    </SchemaComponentOptions>
  );
};
