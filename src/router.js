import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';

import PromptTokenModal from './components/PromptTokenModal';
import Menu from './components/Menu';

const ExpensesChart = React.lazy(() => import('./components/ExpensesChart'));

const { Content } = Layout;

export default () => (
  <Router>
    <Layout style={{ height: '100%' }}>
      <Content>
        <Suspense fallback={<div>Loading...</div>}>
          <Route path='/' component={ExpensesChart} />
        </Suspense>
      </Content>
      <Menu />
    </Layout>
    <PromptTokenModal />
  </Router>
);
