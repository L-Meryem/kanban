const express = require('express');
const router = express.Router();//isolated mini router for modules

const Card = require('./models/Card');
const User = require('./models/User');

router.get('/', async (req, res) => {
    res.render('index'); //no extension
});

//display board
router.get('/board', async (req, res) => {
    const userId = req.session.userId;
    if (!userId)
        res.redirect('/');
    //get cards
    const cards = await Card.find({}).populate('author', 'name');
    const user = await User.findById(userId);
    //populate find the id and brings the user name
    res.render('board', { cards, user });
})

//Create a card
router.post('/card', async (req, res) => {
    console.log(req.body.title);
    console.log(req.body.status);
    console.log(req.session.userId);

    let card = await Card.create({
        title: req.body.title.toLowerCase(),
        author: req.session.userId,
        status: req.body.status.toLowerCase(),
        dateOfCreation: new Date()
    });
    console.log(`Card created ${card}`);
    res.json({ success: true, card: card });
});

//Update card's status
router.put('/card', async (req, res) => {
    console.log( req.body.cardId);
        const card = await Card.findByIdAndUpdate(
        req.body.cardId, 
        { status: req.body.status.toLowerCase() }, 
        { new: true }
    );
    res.json({ success: true, card });
});



module.exports = router;