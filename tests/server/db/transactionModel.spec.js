
const { db, User, Transaction } = require('../../../server/db/index');
const syncAndSeed  = require('../../../server/db/seed');

beforeAll(async () => {
  await syncAndSeed();
});

afterAll(async () => {
  db.close();
});

it('Transaction Model exists', async (done) => {
    const user1 = await User.create({});
    const user2 = await User.create({});

    const transaction = await Transaction.create({
        amount: 150.5,
        donorId: user1.id,
        recipientId: user2.id
  });
  expect(transaction.amount).toBe('150.50');
  done();
});

