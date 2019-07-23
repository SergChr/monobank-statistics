import React, { PureComponent } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Collapse } from 'antd';

import Legend from '../Legend';
import { getStatements } from '../../utils/helpers';
import { getMonthlyExpenses, getWeeklyExpenses } from './helpers';

const { Panel } = Collapse;

export default class ExpensesChart extends PureComponent {
  state = {
    data: [],
  }

  async componentDidMount () {
    const data = await getStatements();
    this.setState({ data });
  }

  render () {
    const { data } = this.state;

    const [monthlyExpenses, totalMonthSpent] = getMonthlyExpenses(data);
    const weeklyExpenses = getWeeklyExpenses(data);

    return (
      <Collapse>
        <Panel header='Monthly expenses'>
          <div>Total money spent: {totalMonthSpent}</div>
          <div style={{ height: '300px' }}>
            <ResponsivePie
              data={monthlyExpenses}
              colors={pie => pie.color}
              sortByValue
              innerRadius={0.3}
              padAngle={1}
              enableRadialLabels={false}
            />
          </div>
          <Legend data={monthlyExpenses} />
        </Panel>
      </Collapse>
    )
  }
}
