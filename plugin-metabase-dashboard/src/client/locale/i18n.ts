
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUS from '../../locale/en-US.json';
import zhCN from '../../locale/zh-CN.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'en-US': {
        'metabase-dashboard': enUS
      },
      'zh-CN': {
        'metabase-dashboard': zhCN
      }
    },
    lng: 'en-US', // 默认语言
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
