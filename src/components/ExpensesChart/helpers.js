import { getMCCById, COLORS } from '../../utils/helpers';
import { format } from 'url';

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function isOtherMCC (mcc) {
  // Deposits or money transfers
  return mcc == 4829 || mcc == 6012;
}

const round = n => Math.round(n * 100) / 100;
const getUniqueMCCs = data => Array.from(new Set(data.map(item => item.mcc)));

export const getCurrentMonth = () => MONTH_NAMES[new Date().getMonth()];
export const getMonthNameByDate = date => MONTH_NAMES[date.getMonth()];

export function getCurrentWeekRange () {
  const DAY_IN_MS = 1000 * 60 * 60 * 24,
    DAYS_IN_A_WEEK = 7;

  const date = new Date();
  const day = date.getDay() - 1;
  const from = new Date(Date.now() - day * DAY_IN_MS);
  const to = new Date(Date.now() + (DAYS_IN_A_WEEK - day) * DAY_IN_MS);
  const fromString = `${from.getDate()} ${getMonthNameByDate(from)}`,
    toString = `${to.getDate()} ${getMonthNameByDate(to)}`;

  return { from: fromString, to: toString };
}

function calcExpensesForPeriod ({ from, to = Infinity, data }) {
  const periodData = data.filter(
    item => item.time <= to &&
      item.time >= from &&
      // get negative values (expenses)
      item.amount < 0
  );
  const MCCs = getUniqueMCCs(periodData);
  const byMCC = MCCs.map(mcc => {
    if (isOtherMCC(mcc)) {
      return;
    }

    const targetData = periodData.filter(item => item.mcc === mcc);

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

export function getMonthlyExpenses (data) {
  const date = new Date(), y = date.getFullYear(), m = date.getMonth();
  const firstDayOfMonth = +new Date(y, m, 1) / 1000;
  const lastDayOfMonth = +new Date(y, m + 1, 0) / 1000;

  return calcExpensesForPeriod({ from: firstDayOfMonth, to: lastDayOfMonth, data });
}

export function getWeeklyExpenses (data) {
  const [date, day] = [new Date().getDate(), new Date().getDay()];
  let startOfAWeek = new Date();
  // starts from Monday, thus + 1
  startOfAWeek.setDate(date - day + 1);
  startOfAWeek.setHours(0);
  startOfAWeek.setMinutes(0);
  startOfAWeek.setSeconds(0);
  // in seconds
  startOfAWeek = startOfAWeek / 1000;

  return calcExpensesForPeriod({ from: startOfAWeek, data });
}

export function getDayExpenses (data) {
  const [from, to] = [new Date(), new Date()];
  from.setHours(0);
  from.setMinutes(0);
  from.setSeconds(0);

  to.setHours(23);
  to.setMinutes(59);
  to.setSeconds(59);

  return calcExpensesForPeriod({ from, to, data });
}
