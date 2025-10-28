// create 2 enpoints for my server
// signup and login
56
const express = require('express');
const router = express.Router();
const User = require('./models/User');
const bcrypt =  require("bcryptjs");

//ROUTE 1
router.post('/signup', async(req, res)=>{
    const salt = await bcrypt.genSalt(10); //length  
    const secPass = await bcrypt.hash(req.body.password, salt);// hash with both pass hash and salt
    let user = await User.create({ //create doc in db defined by users model
        name: req.body.name.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: secPass,
    });
    res.json({user}); 
});

//Route 2
router.post("/login", async (req, res) => {

  let user = await User.findOne({ email: req.body.email.toLowerCase()});
  if (!user) {
    return res.status(400).json({ error: "Login with proper credentials!" });
  }
  
  const passwordCompare = await bcrypt.compare(req.body.password, user.password); //return boolean promise
  if (!passwordCompare) {
    return res
      .status(400)
      .json({ error: "Login with proper credentials!" });
  }
  req.session.userId = user._id; //store user
  req.session.save(e=>{
    console.log(`Session for ${req.session.userId}`);
    res.redirect('/board');

  })
});


module.exports = router;
