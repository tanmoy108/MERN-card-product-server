const model = require("../model/userModel");
const path = require("path")
const User = model.User;
const jwt = require('jsonwebtoken');
const fs = require("fs")
const bcrypt = require('bcrypt')
const privateKey = fs.readFileSync(
    path.resolve(__dirname, '../private.key'),
    'utf-8'
  );
const JWT_ALGORITHM = 'RS256';


exports.createUser = (req, res) => {
    const user = new User(req.body);
    const token = jwt.sign({ email: req.body.email }, privateKey, { algorithm: JWT_ALGORITHM });
    const hash = bcrypt.hashSync(req.body.password, 10);
  
    user.token = token;
    user.password = hash;
  
    user.save()
      .then(() => {
        res.status(200).json({ token });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ error: 'Failed to create user.' });
      });
  };

exports.loginUser=async(req,res)=>{
   try{
    const find = await User.findOne({email:req.body.email})
    const checkPassword = bcrypt.compareSync(req.body.password, find.password);
    if(checkPassword)
    {
        var token = jwt.sign({ email:req.body.email }, privateKey, { algorithm: 'RS256' });
        find.token = token;
        find.save();
        res.status(200).json(token);
    }
    else
    {
        res.sendStatus(401);
    }

   }catch(err)
   {
    res.sendStatus(401);
   }

}
