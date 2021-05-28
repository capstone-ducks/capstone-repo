const router = require('express').Router();
const {models: {User,Transaction} }= require('../db/model/index');

//get all transactions
router.get('/', async (req, res, next) => {
    try {
        
      const transactions = await Transaction.findAll({
        include: [{
            model: User, as: 'donor'
        }, 
        {
            model: User, as: 'recipient'
        }]
      });
      
      //console.log(transactions, 'success in get route transactions');
      res.status(200).send(transactions);
    } catch (err) {
        //console.log(err, 'error in get route transactions');
        next(err);
    }
});

//get all of a users transactions
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        let transactions = {};
        if(user.isDonor === true)
        {
            transactions = await Transaction.findAll({
                where: {
                    donorId: id
                },
                include: [{
                    model: User, as: 'donor'
                }, 
                {
                    model: User, as: 'recipient'
                }]
            });
        }
        else{
            transactions = await Transaction.findAll({
                where: {
                    recipientId: id
                },
                include: [{
                    model: User, as: 'donor'
                }, 
                {
                    model: User, as: 'recipient'
                }]
            });
        }
        res.status(200).send(transactions);

    } catch (err) {
      next(err);
    }
});

//this will post from the blockchain to the db...
router.post('/:id/transactions', async (req, res, next) => {
    try {
        if (!req.body) res.sendStatus(400);

        const { id } = req.params;
        const {amount, recipientId} = req.body;
        const newTransaction = await Transaction.create({
            amount,
            donorId: id,
            recipientId
        });
        //newTransaction.save();
        res.status(201).send(newTransaction);
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;
