import React, { PureComponent } from 'react';
import { ResponsivePie } from '@nivo/pie';

import Legend from '../Legend';
import { getStatements } from '../../utils/helpers';
import {
  getMonthlyExpenses,
  getWeeklyExpenses,
  getCurrentMonth,
  getCurrentWeekRange,
  getDayExpenses,
  getCurrentBalance,
} from './helpers';
import { Card, Content, Dashboard } from './styled';

const Pie = ({ data }) => (
  <>
    {data.length ?
      <>
      <div style={{ height: '300px' }}>
        <ResponsivePie
          data={data}
          colors={pie => pie.color}
          sortByValue
          innerRadius={0.3}
          padAngle={1}
          enableRadialLabels={false}
        />
      </div>
      <Legend data={data} />
      </> : null
    }
  </>
)

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
    const [weeklyExpenses, totalWeekSpent] = getWeeklyExpenses(data);
    const [dayExpenses, totalDaySpent] = getDayExpenses(data);
    const currentWeekRange = getCurrentWeekRange();

    return (
      <Content>
        <Dashboard>
          Balance: {getCurrentBalance(data)}
        </Dashboard>
        <Card>
          <h2>Monthly expenses, % ({getCurrentMonth()})</h2>
          <div>Total money spent: {totalMonthSpent}</div>
          <Pie data={monthlyExpenses} />
        </Card>

        <Card>
          <h2>Weekly expenses, % ({currentWeekRange.from} - {currentWeekRange.to})</h2>
          <div>Total money spent: {totalWeekSpent}</div>
          <Pie data={weeklyExpenses} />
        </Card>

        <Card>
          <h2>This day expenses, %</h2>
          <div>Total money spent: {totalDaySpent}</div>
          <Pie data={dayExpenses} />
        </Card>
      </Content>
    )
  }
}
