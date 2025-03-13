// index.ts
import { Plugin, i18n,tval } from '@nocobase/client';
import en from '../locale/en-US.json';
import zh from '../locale/zh-CN.json';

import { MetabaseDashboardBlockProvider } from './MetabaseDashboardBlockProvider';
import { MetabaseDashboardBlockInitializer } from './MetabaseDashboardBlockInitializer';
import { metabaseDashboardSchemaSettings } from './MetabaseDashboardSchemaSettings';



import { PluginSettingsFormProvider } from './pluginSettingsForm/PluginSettingsFormProvider';
import { PluginSettingsForm } from './pluginSettingsForm/PluginSettingsForm'; 
import { PluginSettingsFormPage } from './pluginSettingsForm/PluginSettingsFormPage';






export class PluginBlockMetabaseDashboardClient extends Plugin {
  async load() {
    this.app.schemaSettingsManager.add(metabaseDashboardSchemaSettings);
    this.app.use(MetabaseDashboardBlockProvider);

    const blockInitializers = this.app.schemaInitializerManager.get('page:addBlock');

    blockInitializers?.add('otherBlocks.metabaseDashboard', {
      //title: '{{t("Metabase Dashboard")}}',
      title: tval("Metabase Dashboard",{ ns: '@dgtech/plugin-metabase-dashboard' }),
      Component: 'MetabaseDashboardBlockInitializer',
    });

    // 注册到 pluginSettingsManager
    this.app.pluginSettingsManager.add('metabase-dashboard', {
      //title: 'Metabase Dashboard Settings',
      title: tval("Metabase Settings",{ ns: '@dgtech/plugin-metabase-dashboard' }),
      icon: 'FormOutlined',
      Component: PluginSettingsForm,
    });

    // 路由
    this.app.router.add('admin.metabase-dashboard-page', {
      path: '/admin/metabase-dashboard-page',
      Component: PluginSettingsFormPage,
    });

    // 全局 provider
    this.app.addProvider(PluginSettingsFormProvider);

    i18n.addResourceBundle('en', 'metabase-dashboard', en);
    i18n.addResourceBundle('zh', 'metabase-dashboard', zh);
  }
}
export default PluginBlockMetabaseDashboardClient;
