// src/plugins/metabase-dashboard/server/collections/metabase-dashboard.ts

import { CollectionOptions } from '@nocobase/database';

export default {
  name: 'metabaseDashboard',
  createdBy: true,
  updatedBy: true,
  fields: [
    {
      type: 'uid',    // 主键
      name: 'id',
      primaryKey: true,
    },
    {
      type: 'string', // 存实际的 dashboard 编号
      name: 'dashboardId',
      required: true,
    },
  ],
} as CollectionOptions;
