const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const ProductRouter = require("./routes/productRoutes");
const dotenv = require('dotenv');
dotenv.config();
const server = express();

//database connection............
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
  console.log("database connected")
}
//database connection end ....................


server.use("/uploads",express.static('uploads')) // for image show
server.use(cors()) // for adding client side
server.use(morgan("combined")); //for logger
server.use(express.json()); // for request body

server.use("/products", ProductRouter.router);

server.listen(process.env.PORT, () => {
  console.log("server started");
});
