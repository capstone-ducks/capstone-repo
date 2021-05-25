const { expect } = require("chai");
const { syncAndSeed } = require("../server/db");
const _app = require("../server");
const app = require("supertest");
const axios = require("axios");

const {
    db,
    model: { User, Transaction },
} = require("../server/db");
const { describe } = require("../server/db/model/User");

describe("Models", () => {
    describe("User Model", () => {
        // Clears the test database before we run tests
        // before(() => db.sync({ force: true }));
        // after(() => db.close());
        
        it("defaults firstName to `Anonymous` if not provided", async () => {
            const user = User.build({});
            expect(user.firstName).to.equal("Anonymous");
        });

        it("defaults lastName to `User` if not provided", async () => {
            const user = User.build();
            expect(user.lastName).to.equal("User");
        });

        it("requires `password`", async () => {
            const user = User.build();
            try {
                await user.validate();

                throw Error(
                    "validation was successful but should have failed without `password`",
                );
            } catch (err) {
                expect(err.message).to.contain("password cannot be null");
            }
        });

        it("maintains correct length for publicKey", async () => {
            const user = User.build({
                password: "12345678",
                publicKey: "12345678901234567890abcnshdgetiuhdjflakjdsf",
            });
            const correctUser = User.build({
                password: "12345678",
                publicKey:
                    "046e145ccef1033dea239875dd00dfb4fee6e3348b84985c92f103444683bae07b83b5c38e5e2b0c8529d7fa3f64d46daa1ece2d9ac14cab9477d042c84c32ccd0",
            });

            try {
                await user.validate();
                throw Error(
                    "validation was successful but should have failed with incorrect `publicKey length`",
                );
            } catch (err) {
                expect(err.message).to.contain(
                    "Validation len on publicKey failed",
                );
            }

            await correctUser.validate();
            expect(correctUser.publicKey).to.equal(
                "046e145ccef1033dea239875dd00dfb4fee6e3348b84985c92f103444683bae07b83b5c38e5e2b0c8529d7fa3f64d46daa1ece2d9ac14cab9477d042c84c32ccd0",
            );
        });

        it("maintains correct length for cryptoAddress", async () => {
            const user = User.build({
                password: "12345678",
                cryptoAddress: "73E291D1AB06C",
            });
            const correctUser = User.build({
                password: "12345678",
                cryptoAddress: "0x00B54E93EE2EBA3086A55F4249873E291D1AB06C",
            });

            try {
                await user.validate();
                throw Error(
                    "validation was successful but should have failed with incorrect `cryptoAddress length`",
                );
            } catch (err) {
                expect(err.message).to.contain(
                    "Validation len on cryptoAddress failed",
                );
            }

            // await correctUser.validate();
            // expect(correctUser.cryptoAddress).to.equal(
            //     "0x00B54E93EE2EBA3086A55F4249873E291D1AB06C",
            // );
        });
    });
    describe("Transaction Model", () =>{
     
        it('Transaction Model exists', async () => {
            const transaction = await Transaction.create({
                amount: 150.5,
                donorId: 1,
                recipientId: 2
          });
          console.log(transaction);
          expect(transaction.amount).to.equal('150.00');
        });
    });
});
