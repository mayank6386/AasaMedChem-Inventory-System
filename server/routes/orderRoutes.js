const express = require("express");

const Product =
require("../models/Product");

const Order =
require("../models/Order");

const convertToBaseUnit =
require("../utils/conversion");

const router = express.Router();

/*
PLACE ORDER
*/

router.post("/", async(req,res)=>{

 try{

 const {
   productId,
   quantity,
   unit
 } = req.body;

 const product =
 await Product.findById(productId);

 if(!product){
   return res.status(404)
   .json({
      message:"Product Not Found"
   });
 }

 const convertedQty =
 convertToBaseUnit(
   quantity,
   unit
 );

 const totalPrice =
 convertedQty *
 product.pricePerUnit;

 const order =
 await Order.create({

   product:product._id,

   enteredQuantity:quantity,

   enteredUnit:unit,

   convertedQuantity:convertedQty,

   totalPrice

 });

 res.status(201).json(order);

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

});

/*
GET ALL ORDERS
*/

router.get("/",async(req,res)=>{

 const orders =
 await Order.find()
 .populate("product");

 res.json(orders);

});

module.exports = router;