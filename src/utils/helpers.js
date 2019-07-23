import mccCodes from '../data/mcc';
import { Config, Statements } from './db';
import getApiInstance from './api';

const SIXTY_SECONDS = 60000;

export const COLORS = [
  '#EF6F6C',
  '#56E39F',
  '#5B6C5D',
  '#59C9A5',
  '#E22DA6',
  '#C9A550',
  '#AA123B',
  '#77486A',
  '#8FC2A5',
  '#F5F2B8',
  '#818AA3',
  '#F9DAD0',
  '#C5DCA0',
  '#D8CBC7',
  '#CC3F0C',
  '#9A6D38',
  '#33673B',
];

export function getMCCById (id) {
  const mcc = mccCodes.find(item => item.id == id);
  if (mcc) {
    return mcc.description;
  }

  return 'Unknown';
}

export async function getStatements () {
  const lastApiCall = await Config.get('lastApiCall') || 0;
  const isLastApiCallWasPerformedRecently = (Date.now() - lastApiCall) < SIXTY_SECONDS;

  if (!isLastApiCallWasPerformedRecently) {
    await fetchStatements();
  }

  const statements = (await Statements.getAll() || [])
    .sort((a, b) => a.time - b.time);

  return statements;
}

async function fetchStatements () {
  console.log('fetchStatements called');
  const api = await getApiInstance();

  // TODO: fetch all available data, not for 1 last month
  const monthAgo = Math.floor(Date.now() / 1000 - (60 * 60 * 24 * 31));
  // 0 means a default user account (instead of account_id)
  const { data } = await api.get(`/personal/statement/0/${monthAgo}`);
  await Config.set('lastApiCall', Date.now());
  await Statements.setBulk(data);

  return data;
}
