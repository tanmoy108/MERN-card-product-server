const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        unique:true,
        validate: {
          validator: function(v) {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
          },
          message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'User email required']
      },
      name:{type:String,required:true},
      password:{type:String,minLenght:6,required:true},
      token:{type:String}
    });

exports.User = mongoose.model('User',userSchema);