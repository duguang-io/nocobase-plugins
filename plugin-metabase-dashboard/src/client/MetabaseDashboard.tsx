// src/plugins/metabase-dashboard/client/MetabaseDashboard.tsx

import { observer, useField } from '@formily/react';
import {
  useRequest,
  useBlockHeight,
  useApp,
  tval
} from '@nocobase/client';
import { Card, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import RIframe from 'react-iframe';
import type { IIframe } from 'react-iframe/types';





import { useT } from './locale/index';


function isNumeric(str: string | undefined) {
  if (typeof str !== 'string') return false;
  return !isNaN(str as any) && !isNaN(parseFloat(str));
}


export const MetabaseDashboard: any = observer(
  (props: IIframe & { dashboardRecordId?: string; height?: string }) => {
    const { dashboardRecordId, height } = props;
    const field = useField();
    
    const [url, setUrl] = useState<string>(null);
    const targetHeight = useBlockHeight() || height;
    const t = useT();
    const { loading, data: embedUrl } = useRequest<string>(
      {
        url: `metabaseDashboard:getEmbedUrl/${dashboardRecordId}`,
      },
      {
        refreshDeps: [dashboardRecordId, field.data],
        ready: !!dashboardRecordId,
      },
    );

    useEffect(() => {
      if (embedUrl) {
        setUrl(embedUrl);
      }
    }, [embedUrl]);
    if (!dashboardRecordId) {
        return (
        <Card style={{ marginBottom: 24, height: isNumeric(targetHeight) ? `${targetHeight}px` : targetHeight }}>
          {t('noConfig')}

        </Card>
      );
    }

    if (loading && !url) {
      return (
        <div 
          style={{ 
            marginBottom: '24px', 
            height: isNumeric(targetHeight) ? `${targetHeight}px` : targetHeight || '60vh', 
            border: 0,
          }}>
          <Spin />
        </div>
      );
    }

    return (
      <RIframe
        url={url}
        width="100%"
        display="block"
        position="relative"
        styles={{
          marginBottom: '24px',
          height: isNumeric(targetHeight) ? `${targetHeight}px` : targetHeight || '60vh',
          border: 0,
        }}
      />
    );
  },
  { displayName: 'MetabaseDashboard' },
);
