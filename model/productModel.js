const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {type:String,unique: true,required: [true, 'it is important']},
  description: String,
  price:{type:Number,min:[0,"must be greater than 0"],required:true},
  discountPercentage : Number,
  rating:{type:Number,min:0,max:5,required:true},
  brand: String,
  category:{type:String,required:true},
  thumbnail:{type:String,required:true},
  images:[String],
});

exports.Product = mongoose.model('Product', productSchema);

