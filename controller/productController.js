const model = require("../model/productModel");
const Product = model.Product;

exports.createProduct =(req, res) => {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: req.file.filename, // Store the filename in the 'thumbnail' field
  });

  product.save().then(() => {
    console.log('Product created successfully');
    res.status(201).json(product);
  }).catch((e) => {
    console.log('There was an error', e.message);
    res.status(400).json(e);
  });
};

// exports.createProduct = (req, res) => {
//     const product = new Product(req.body); // only post create korar jonno lage
//     product.save().then( () => {
//       console.log('well');
//       res.status(201).json(product);
//     }).catch( (e) => {
//       console.log('There was an error', e.message);
//       res.status(400).json(e);
//     });
    
// };
exports.getAllProduct =async (req, res) => {
  const allProduct = await Product.find()
  res.status(200).json(allProduct);
};

exports.getSpecificProduct = async (req, res) => {
  const productId = req.params.id;
  const specificProduct = await Product.findOne({_id:productId})
  res.status(200).json(specificProduct);
};

exports.replaceProduct = async(req, res) => {
  const productId = req.params.id;
  const replaceProduct = await Product.findOneAndReplace({_id:productId},req.body,{returnDocument
    :"after"})
  console.log(replaceProduct);
  res.status(200).json(replaceProduct);
};

exports.updateProduct = async(req, res) => {
  const productId = req.params.id;
  const updateProduct = await Product.findOneAndUpdate({_id:productId},{
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: req.file.filename, // Store the filename in the 'thumbnail' field
  },{returnDocument
    :"after"})
  res.status(200).json(updateProduct);
};

exports.deleteProduct = async(req, res) => {
  const productId = req.params.id;
  const deleteProduct = await Product.findOneAndDelete({_id:productId})
  res.status(200).json(deleteProduct);
};
