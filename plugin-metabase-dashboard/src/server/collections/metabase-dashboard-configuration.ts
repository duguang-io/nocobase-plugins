import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'metabaseDashboardConfiguration',
  fields: [
    {
      type: 'integer',
      name: 'id',
      primaryKey: true,
      autoIncrement: true,
      required: true,
      
    },
    {
      type: 'string',
      name: 'baseUrl',
      required: true,
    },
    {
      type: 'string',
      name: 'secretKey',
      required: true,
    },
  ],
});
