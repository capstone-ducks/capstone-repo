const { db, User, Transaction } = require('./index');

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
  }
  catch(err) {
    console.log('error seeding data :', err)
  }
};

module.exports = syncAndSeed;
