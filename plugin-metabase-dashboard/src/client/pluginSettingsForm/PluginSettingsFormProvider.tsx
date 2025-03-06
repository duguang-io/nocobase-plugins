import React, { createContext, FC } from 'react';
import { useRequest, UseRequestResult } from '@nocobase/client';

/**
 * 定义表单要存储的字段: baseUrl, secretKey
 */
type MetabaseDashboardConfigData = {
  baseUrl: string;
  secretKey: string;
};

const PluginSettingsFormContext = createContext<UseRequestResult<{ data?: MetabaseDashboardConfigData }>>(null as any);

/**
 * 通过 `useRequest` 向后端请求 `metabaseDashboardConfiguration:get`
 * 用于在全局获取/刷新 Metabase 配置信息
 */
export const PluginSettingsFormProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const request = useRequest<{ data?: MetabaseDashboardConfigData }>({
    url: 'metabaseDashboardConfiguration:get',
  });

  return (
    <PluginSettingsFormContext.Provider value={request}>
      {children}
    </PluginSettingsFormContext.Provider>
  );
};

export const usePluginSettingsFormRequest = () => {
  return React.useContext(PluginSettingsFormContext);
};
