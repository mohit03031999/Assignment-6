/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo inventoryTracker scripts/init.mongo.js
 * Atlas:
 *   mongo "mongodb+srv://cluster.yxyis.mongodb.net/inventoryTracker" --username jainamcsheth scripts/init.mongo.js
 */

/* global db print */
/* eslint no-restricted-globals: "off" */

db.products.remove({});
db.deleted_products.remove({});

const initialProducts = [
  {
    id: 1,
    name: "Levi's",
    category: 'Jeans',
    price: '30',
    imageUrl: 'https://picsum.photos/500/500',
  },
  {
    id: 2,
    name: 'Allen Solly',
    category: 'Shirts',
    price: '25',
    imageUrl: 'https://picsum.photos/500/500',
  },
];

db.products.insertMany(initialProducts);
const count = db.products.count();
print('Inserted total of ', count, 'products');

db.counters.remove({ _id: 'products' });
db.counters.insert({ _id: 'products', current: count });

db.products.createIndex({ id: 1 }, { unique: true });
db.products.createIndex({ name: 1 });
db.products.createIndex({ price: 1 });
db.products.createIndex({ category: 1 });
db.deleted_products.createIndex({ id: 1 }, { unique: true });
