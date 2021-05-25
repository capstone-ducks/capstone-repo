
const { db, User, Transaction } = require('../../../server/db/index');
const syncAndSeed  = require('../../../server/db/seed');
let expect = require('chai').expect;
// beforeAll(async () => {
//   await syncAndSeed();
// });

// afterAll(async () => {
//   db.close();
// });

before(async () => {
  await syncAndSeed();
});

after(async () => {
  db.close();
});

it('Transaction Model exists', async () => {
    const user1 = await User.create({});
    const user2 = await User.create({});

    const transaction = await Transaction.create({
        amount: 150.5,
        donorId: user1.id,
        recipientId: user2.id
  });
  //console.log(transaction);
  expect(transaction.amount).to.equal('150.50');
});

