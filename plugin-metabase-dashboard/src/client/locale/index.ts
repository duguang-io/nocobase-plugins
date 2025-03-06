// @ts-ignore
import { useTranslation } from 'react-i18next';

export const useT = () => {
  const { t } = useTranslation('metabase-dashboard');
  return t;
};