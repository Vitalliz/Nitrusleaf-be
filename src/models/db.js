import loadModels from './index.model.js';

let dbInstance;

async function getDb() {
  if (!dbInstance) {
    dbInstance = await loadModels();
  }
  return dbInstance;
}

export default getDb;