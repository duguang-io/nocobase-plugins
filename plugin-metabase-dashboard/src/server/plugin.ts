// import { Plugin } from '@nocobase/server';

// export class PluginMetabaseDashboardServer extends Plugin {
//   async afterAdd() {}

//   async beforeLoad() {}

//   async load() {}

//   async install() {}

//   async afterEnable() {}

//   async afterDisable() {}

//   async remove() {}
// }

// export default PluginMetabaseDashboardServer;

// src/plugins/metabase-dashboard/server/plugin.ts

import { InstallOptions, Plugin } from '@nocobase/server';
import path from 'path';
import { getEmbedUrl } from './actions';

export class PluginBlockMetabaseDashboardServer extends Plugin {
  async load() {
    // 1. 加载数据库表定义
    await this.importCollections(path.resolve(__dirname, 'collections'));

    // 2. 注册 Action: metabaseDashboard:getEmbedUrl
    this.app.actions({
      'metabaseDashboard:getEmbedUrl': getEmbedUrl,
    });

    // 3. 配置 ACL，允许已登录用户访问该操作
    this.app.acl.allow('metabaseDashboard', 'getEmbedUrl', 'loggedIn');
    
    this.app.acl.allow('metabaseDashboardConfiguration', '*', 'loggedIn');

    


    // 4. 注册一个权限片段，便于在权限管理中选择
    this.app.acl.registerSnippet({
      name: 'ui.metabaseDashboard',
      actions: ['metabaseDashboard:*'],
    });
  }

  async install(options?: InstallOptions) {}
  async afterEnable() {}
  async afterDisable() {}
  async remove() {}
}

export default PluginBlockMetabaseDashboardServer;
