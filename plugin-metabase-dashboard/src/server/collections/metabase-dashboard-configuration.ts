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
    {
      type: 'integer',
      name: 'expiration',
      defaultValue: 10, // 默认10分钟，单位为分钟
      description: 'JWT令牌过期时间(分钟)'
    },
  ],
});
