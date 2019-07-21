import Dexie from 'dexie';

const db = new Dexie('store');

db.version(1).stores({
  config: 'id, lastApiCall, token',
  statements: 'id'
});

export const Config = {
  get: async (key) => {
    const config = await db.config.toArray();
    if (!config[0]) {
      return null;
    }
    return config[0][key];
  },
  
  set: async (key, value) => {
    const config = await db.config.toArray();
    const existingConfig = config[0] || {};
    return db.config.put({ id: 1, ...existingConfig, [key]: value });
  }
}

export const Statements = {
  setBulk: (data) => {
    return db.statements.bulkPut(data);
  },

  getAll: () => {
    return db.statements.toArray();
  }
}
