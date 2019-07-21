import mccCodes from '../data/mcc';
import { Config, Statements } from './db';
import getApiInstance from './api';

export function getMCCById (id) {
  const mcc = mccCodes.find(item => item.id == id);
  if (mcc) {
    return mcc.description;
  }

  return 'Unknown';
}

export async function getStatements () {
  const statements = (await Statements.getAll() || [])
    .sort((a, b) => a.time - b.time);

  if (statements) {
    return statements;
  }

  const token = await Config.get('token');
  const api = await getApiInstance();

  if (!statements.length && token) {
    const monthAgo = Math.floor(Date.now()/1000 - (60 * 60 * 24 * 31));
    const { data } = await api.get(`/personal/statement/0/${monthAgo}`);
    await Config.set('lastApiCall', Date.now());
    await Statements.setBulk(data);

    return Statements.getAll();
  }
}
