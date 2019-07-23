import React from 'react';
import { Menu } from 'antd';

export default () => (
  <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
    <Menu.Item key="1">Dashboard</Menu.Item>
    {/* <Menu.Item key="2">Option 2</Menu.Item>
    <Menu.Item key="3">Option 3</Menu.Item>
    <Menu.Item key="4">Option 4</Menu.Item> */}
  </Menu>
);
