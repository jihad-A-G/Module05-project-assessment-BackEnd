import Product from "../models/productModel.js";

export const getProducts = async(req,res,next) =>{
    try{
        const products = await Product.find()

        if(!products){
            return res.status(404).json({status:404, message:'No products found'})
        }

        res.status(200).json({status:200, products:products})
    }catch(err){
        console.log(err);
        res.status(500).json({status:500, message:'Internal Server Error'})
    }
}

export const getProductById = async(req,res,next) =>{
    const {id} = req.params
    try {
        const product = await Product.findById(id)

        if(!product){
            return res.status(404).json({status:404, message:'No product found'})
        }

        res.status(200).json({status:200,product:product})
        
    } catch (err) 
    {
        console.log(err);
        res.status(500).json({status:500, message:'Internal Server Error'})
    }
}

export const addProduct = async(req,res,next) =>{
    const {title, description, price} = req.body
    const image = req.file
    try {
        if(!title || !description || !price || !image){
            return res.status(400).json({status:400, message:'All feilds are required'})
        }

        const product = await Product.create({
            title:title,
            description:description,
            price:price,
            image:image?.path
        })

        res.status(200).json({status:200,message:'product was added successfully',product:product})
        
    } catch (err) {
        console.log(err);
        res.status(500).json({status:500, message:'Internal Server Error'})
    }
}

export const editProduct = async(req,res,next) =>{
    const {id} = req.params
    const image = req.file??req.body.defaultImage
    try {
        if(!req.body){
            return res.status(400).json({status:400, message:'Nothing to update!'})
        }
    
        const product = await Product.findByIdAndUpdate(id, {...req.body, image:image})

        res.status(200).json({status:200, message:'product was updated successfully', product:product})
        
    } catch (err) {
        console.log(err);
        res.status(500).json({status:500, message:'Internal Server Error'})
    }
}

export const deleteProduct = async(req,res,next) =>{
    const {id} = req.params
    try {
        if(!id){
            return res.status(404).json({status:404, message:'Incorrect id'})
        }
        const product = await Product.findByIdAndDelete(id)

        res.status(200).json({status:200, message:'product was deleted succesfully',product:product})

    } catch (err) {
        console.log(err);
        res.status(500).json({status:500, message:'Internal Server Error'})
    }
}