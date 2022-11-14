import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Note: Parts of the putDb and getDb code were provided by the instructor

export const putDb = async (content) => {
  console.log(">>>PUT to the database");

  const jateDb = await openDB("jate", 1);

  const tx = jateDb.transaction("jate", "readwrite");

  const store = tx.objectStore("jate");

  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log(">>>Data saved to database", result.value);
}

export const getDb = async () => {
  console.log(">>>GET from the database");

  const jateDb = await openDB("jate", 1);

  const tx = jateDb.transaction("jate", "readonly");

  const store = tx.objectStore("jate");

  const request = store.getAll();

  const result = await request;
  console.log(">>>Got all data from database", result.value);
  return result;
};

initdb();
