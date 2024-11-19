'use client';

import { PropsWithChildren } from 'react';
import { ConfigProvider, theme } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { ThemeConfig } from 'antd';

import variables from '../styles/variables.module.scss';

export default function Wrapper(props: PropsWithChildren) {
  const { children } = props;

  const config: ThemeConfig = {
    // // Use dark algorithm
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: variables.primaryColor,
      colorBgContainer: variables.backgroundButtonColor,
      fontFamily: variables.fontFamily,
    },
    components: {
      Button: {
        fontWeight: 600,
        borderRadius: 4,
        // colorBgContainer: variables.backgroundButtonColor,
        // colorText: '#FFF',
        // colorBorder: 'transparent',
        // defaultShadow: variables.btnBoxShadow,
        // defaultGhostColor: '#FFF',
        // ghostBg: variables.backgroundButtonColor,
        // defaultGhostBorderColor:
        // primaryColor: ,
        colorPrimary: variables.backgroundButtonColor,
        primaryShadow: variables.btnBoxShadow,
      },
    },
  };

  return (
    <AntdRegistry>
      <ConfigProvider theme={config}>{children}</ConfigProvider>
    </AntdRegistry>
  );
}
