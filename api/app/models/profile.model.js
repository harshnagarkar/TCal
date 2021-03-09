// var mongoose = require('mongoose');
module.exports = mongoose => {
    const User = mongoose.model(
      "User",
      mongoose.Schema(
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },empId: {
                type: String,
                required: true
            },firstName: {
                type: String,
                required: true
            },lastName: {
                type: String,
                required: true,
            },department: {
                type: String,
            },position: {
                type: String
            }, payRate:{
                type: Number,
                required: true
            },email:{
                type: String,
                required: true
            },  phone:{
                type: Number,
                required: true
            }
        }
      )
    );
  
    return User;
  };



// const ProfileSchema = new mongoose.Schema({
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//     },empId: {
//         type: String,
//         required: true
//     },firstName: {
//         type: String,
//         required: true
//     },lastName: {
//         type: String,
//         required: true,
//     },department: {
//         type: String,
//     },position: {
//         type: String
//     }, payRate:{
//         type: Number,
//         required: true
//     },email:{
//         type: String,
//         required: true
//     },  phone:{
//         type: Number,
//         required: true
//     }
// })
// module.exports = mongoose.model('User',ProfileSchema)