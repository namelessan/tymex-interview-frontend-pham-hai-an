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
      fontFamily: variables.fontFamily,
      borderRadius: 4,
    },
    components: {
      Button: {
        fontWeight: 600,
        borderRadius: 4,
        colorPrimary: variables.backgroundButtonColor,
        primaryShadow: variables.btnBoxShadow,
      },
      Input: {
        colorBgContainer: variables.backgroundColor,
        colorBorder: '#fff',
        paddingBlock: 8,
      },
      Select: {
        colorBgContainer: 'transparent',
      },
      Slider: {
        railHoverBg: variables.railBg,
        railBg: variables.railBg,
      },
    },
  };

  return (
    <AntdRegistry>
      <ConfigProvider theme={config}>{children}</ConfigProvider>
    </AntdRegistry>
  );
}
