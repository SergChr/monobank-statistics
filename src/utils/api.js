import axios from 'axios';

import { Config } from './db';

export default async () => axios.create({
  baseURL: 'https://api.monobank.ua',
  timeout: 10000,
  headers: {
    'X-Token': await Config.get('token'),
  },
})
