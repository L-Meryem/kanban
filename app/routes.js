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
    const users = await User.find({}).populate('name');
    //populate find the id and brings the user name
    res.render('board', { cards, user, users, userId });
})

//Create a card
router.post('/card', async (req, res) => {
    let card = await Card.create({
        title: req.body.title.toLowerCase(),
        author: req.session.userId,
        status: req.body.status.toLowerCase(),
        dateOfCreation: new Date()
    });
    res.json({ card });
});

//Update card's status
router.put('/card', async (req, res) => {
    const card = await Card.findByIdAndUpdate(
        req.body.cardId,
        { status: req.body.status.toLowerCase() },
        { new: true }
    );
    res.json({ card });
});

//Delete card
router.delete('/card', async (req, res) => {
    const card = await Card.findByIdAndDelete(
        req.body.cardId);
    res.json({ card });
});

//Delete user
router.get('/unlink', async (req, res) => {
    const userId = req.session.userId;
    await Card.deleteMany({ author: userId });
    await User.findByIdAndDelete(userId);
    req.session.destroy(e => {
        console.log('Could not logout');
        res.redirect('/');
    });
});


module.exports = router;