import React from 'react';
import { Menu as AntMenu } from 'antd';
import styled from 'styled-components';

const Menu = styled(AntMenu)`
  // position: fixed;
  bottom: 0;
  position: sticky;
  width: 100%;
`;

export default () => (
  <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
    <Menu.Item key="1">Dashboard</Menu.Item>
  </Menu>
);
