const model = require("../model/userModel");
const User = model.User;
const jwt = require('jsonwebtoken');
const fs = require("fs")
const privateKey = fs.readFileSync('private.key');


exports.createUser=(req,res)=>{
    const user = new User(req.body);
    var token = jwt.sign({ email:req.body.email }, privateKey, { algorithm: 'RS256' });
    const hash = bcrypt.hashSync(req.body.password, 10);
    user.token = token;
    user.password = hash;

    user.save().then(()=>{
        res.status(200).json({token})
    }).catch((err)=>{
        console.log(err);
    })
}
