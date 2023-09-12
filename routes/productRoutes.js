const express = require("express");
const multer = require('multer');
const routes = express.Router();
const products = require("../controller/productController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // This is the directory where uploaded images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
console.log("storage:", storage);
const upload = multer({ storage: storage });

routes
  .post("/",upload.single('thumbnail'),products.createProduct)
  .get("/", products.getAllProduct)
  .get("/:id", products.getSpecificProduct)
  .put("/:id", products.replaceProduct)
  .patch("/:id",upload.single('thumbnail'),products.updateProduct)
  .delete("/:id", products.deleteProduct);

exports.router = routes;
