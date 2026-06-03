const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product"
  },

  enteredQuantity:Number,

  enteredUnit:String,

  convertedQuantity:Number,

  totalPrice:Number,

  status:{
    type:String,
    default:"Pending"
  }
},
{
 timestamps:true
}
);

module.exports = mongoose.model(
"Order",
orderSchema
);