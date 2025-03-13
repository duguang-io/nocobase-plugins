// src/plugins/metabase-dashboard/server/actions/index.ts

import jwt from 'jsonwebtoken';
import { Context, Next } from '@nocobase/actions';
import { Repository } from '@nocobase/database';

export async function getEmbedUrl(ctx: Context, next: Next) {
  const { filterByTk } = ctx.action.params;
  const { resourceName } = ctx.action; // 
  const repository = ctx.db.getRepository<any>(resourceName) as Repository;
  const record = await repository.findById(filterByTk);

  if (!record) {
    ctx.body = { error: 'Record not found' };
    return;
  }


  const dashboardId = record.get('dashboardId');
  const mode = record.get('mode');

  
  
  //从 "metabaseDashboardConfiguration" 表中读取 baseUrl, secretKey
  const configRepo = ctx.db.getRepository('metabaseDashboardConfiguration');
  const configRecord = await configRepo.findOne({
    where: { id: 1 }, // 确保只取 `id=1` 的记录
  });
  if (!configRecord) {
    ctx.body = 'No Metabase config found. Please set it in plugin settings.';
    return;
  }
  const METABASE_SITE_URL = configRecord.get('baseUrl');
  const METABASE_SECRET_KEY = configRecord.get('secretKey');
  
  let payload;
    if(mode === 'dashboard'){

      payload = {
        resource: { dashboard: Number(dashboardId) }, 
        params: {},
        exp: Math.round(Date.now() / 1000) + 10 * 60,
      };
    } else if(mode === 'question'){
      payload = {
        resource: { question: Number(dashboardId) }, 
        params: {},
        exp: Math.round(Date.now() / 1000) + 10 * 60,
      };
    }

  
  const token = jwt.sign(payload, METABASE_SECRET_KEY);

  let iframeUrl;
  if(mode === 'dashboard'){
    iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true`;
  } else if(mode === 'question'){
    iframeUrl = `${METABASE_SITE_URL}/embed/question/${token}#bordered=true&titled=true`;
  }
  


  ctx.body = iframeUrl;
  ctx.withoutDataWrapping = true; 
  ctx.set({
    'Content-Type': 'text/plain; charset=UTF-8',
  });

  await next();
}
