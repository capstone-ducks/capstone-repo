
const { syncAndSeed, db, model: {User, Transaction} } = require('../server/db/index');
//const syncAndSeed  = require('../server/db/seed');
const { expect } = require("chai");
const { describe } = require("../server/db/model/Transaction");

before(async () => {
  await syncAndSeed();
});

after(async () => {
  db.close();
});

describe("Transaction Model", () =>{
    it('Transaction Model exists', async () => {
        // const user1 = await User.create({});
        // const user2 = await User.create({});

        const transaction = await Transaction.create({
            amount: 150.5,
            // donorId: user1.id,
            // recipientId: user2.id
    });
    console.log(transaction.amount);
    expect(transaction.amount).to.equal('150.00');
    });
});
