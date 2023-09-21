const model = require("../model/userModel");
const User = model.User;


exports.getUser = async(req,res)=>{
    const data = await User.find();
    res.status(200).json(data);
}

exports.updateUser=async(req,res)=>{
    const params = req.params.id;
    const data = await User.findOneAndUpdate({_id:params},req.body,{returnDocument
        :"after"})
    res.status(200).json(data);
}
exports.deleteUser=async(req,res)=>{
    const params = req.params.id;
    const data = await User.findOneAndDelete({_id:params})
    res.status(200).json(data);
}