import React from 'react';
import { useRequest } from '@nocobase/client';

export const PluginSettingsFormPage = () => {
  const { data, loading } = useRequest<{ data?: { baseUrl: string; secretKey: string } }>({
    url: 'metabaseDashboardConfiguration:get',
  });

  if (loading) return <p>Loading...</p>;
  return <pre>{JSON.stringify(data?.data, null, 2)}</pre>;
};
