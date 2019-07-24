import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';

import PromptTokenModal from './components/PromptTokenModal';
import Menu from './components/Menu';

const DashboardPage = React.lazy(() => import('./components/DashboardPage'));

const { Content } = Layout;

export default () => (
  <Router>
    <Layout style={{ minHeight: '100vh' }}>
      <Content>
        <Suspense fallback={<div>Loading...</div>}>
          <Route path='/' component={DashboardPage} />
        </Suspense>
      </Content>
      <Menu />
    </Layout>
    <PromptTokenModal />
  </Router>
);
