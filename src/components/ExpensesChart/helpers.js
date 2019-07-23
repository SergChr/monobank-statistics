import { getMCCById, COLORS } from '../../utils/helpers';

function isOtherMCC (mcc) {
  // Deposits or money transfers
  return mcc == 4829 || mcc == 6012;
}

const round = n => Math.round(n * 100) / 100;

export function getMonthlyExpenses (data) {
  const date = new Date(), y = date.getFullYear(), m = date.getMonth();
  const firstDayOfMonth = +new Date(y, m, 1) / 1000;
  const lastDayOfMonth = +new Date(y, m + 1, 0) / 1000;

  const monthData = data.filter(
    item => item.time <= lastDayOfMonth &&
      item.time >= firstDayOfMonth &&
      item.amount < 0
  );
  const MCCs = new Set(data.map(item => item.mcc));
  const byMCC = Array.from(MCCs).map(mcc => {
    if (isOtherMCC(mcc)) {
      return;
    }

    const targetData = monthData.filter(item => item.mcc === mcc);

    return {
      mcc: {
        code: mcc,
        description: getMCCById(mcc),
      },
      description: Array.from(new Set(targetData.map(item => item.description))),
      value: targetData
        // amount is a negative number as it's an expense
        // divide by 100 as value pointed in UAH coins
        .map(item => Math.abs(item.amount) / 100)
        .reduce((a, b) => a + b, 0)
    }
  })
    .filter(i => !!i);

  const totalExpenses = byMCC.map(i => i.value).reduce((a, b) => a + b, 0);

  const chartData = byMCC.map((item, i) => ({
    id: item.mcc.description,
    label: item.mcc.description,
    value: Math.round(item.value * 100 / totalExpenses * 10) / 10,
    color: COLORS[i],
    // TODO: filter items by currencyCode (some expenses can be done in other currency)
    amount: round(item.value),
  }));

  return [chartData, round(totalExpenses)];
}

export function getWeeklyExpenses (data) {
  return;
}
