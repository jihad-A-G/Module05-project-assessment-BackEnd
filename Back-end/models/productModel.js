import mongoose from "mongoose";

const prodyctSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})

const Product = mongoose.model('products',prodyctSchema)

export default Product