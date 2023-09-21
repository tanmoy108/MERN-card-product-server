const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors");//frontend connect
const morgan = require("morgan"); // logger
const path = require("path");
const ProductRouter = require("./routes/productRoutes");
const UserRouter = require("./routes/userRoutes");
const AuthRouter = require("./routes/authRoute")
const dotenv = require('dotenv'); //.env
const jwt = require('jsonwebtoken');
const fs = require("fs")
const publicKey = fs.readFileSync('public.key');
dotenv.config();
const server = express();

//database connection............
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("database connected")
}
//database connection end ....................

//middleware section ..................................
const auth = (req,res,next)=>{

  try{
    const tokenHeader = req.get("Authorization").split('Bearer ')[1];
    console.log(tokenHeader);
    var decoded = jwt.verify(tokenHeader, publicKey);
    console.log(decoded);
    if(decoded.email)
    {
      next()
    }
    else{
      res.sendStatus(401)
    }
  }catch(err){
    res.sendStatus(401)
  }
}
server.use(cors()) // for adding client side
server.use(morgan("combined")); //for logger
server.use(express.json()); // for request body
server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)))
server.use("/uploads",express.static(path.resolve(__dirname,'uploads'))) // for image show

server.use("/auth", AuthRouter.router);
server.use("/products",auth, ProductRouter.router);
server.use("/users", auth, UserRouter.router);
server.use("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,"build","index.html"))
})

//port section ...................................
server.listen(process.env.PORT, () => {
  console.log("server started");
});
