import React, { PureComponent } from 'react';
import { ResponsivePie } from '@nivo/pie';

import { getMCCById, getStatements } from '../../utils/helpers';

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

    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    const firstDayOfMonth = +new Date(y, m, 1) / 1000;
    const lastDayOfMonth = +new Date(y, m + 1, 0) / 1000;

    const monthData = data.filter(
      item => item.time <= lastDayOfMonth && item.time >= firstDayOfMonth
    );
    const MCCs = new Set(data.map(item => item.mcc));
    const byMCC = Array.from(MCCs).map(mcc => {
      const targetData = monthData.filter(item => item.mcc === mcc);
      return {
        mcc: {
          code: mcc,
          description: getMCCById(mcc),
        },
        description: Array.from(new Set(targetData.map(item => item.description))),
        value: targetData
          .map(item => item.amount)
          .reduce((a, b) => a + b)
      }
    });
    console.log('byMCC', byMCC);

    const chartData = byMCC.map(item => ({
      id: item.mcc.description,
      label: item.mcc.description,
      value: item.value
    }))
    
    return (
      <ResponsivePie
        data={chartData}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        animate={true}
      />
    )
  }
}
