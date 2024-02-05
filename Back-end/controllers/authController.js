import Admin from "../models/adminModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv' 
dotenv.config()
export const  adminSignUp = async(req,res,next) =>{
    const {username,email,password} = req.body

    try{
        if(!username || !email || !password){
            return res.status(400).json({status:400, message:'All fileds are required'})
        }
        let admin = await Admin.findOne({$or:[{email:email},{username:username}]})

        if(admin){
            return res.status(401).json({status:401, message:'admin already exists!'})
        }

        const hashedPassword = await bcrypt.hash(password,12)

        admin = await Admin.create({

            username:username,
            email:email,
            password:hashedPassword,
            role:'admin'
        })

        res.status(200).json({status:200, message:'admin signedup successfully', admin:admin})

    }catch(err){
        console.log(err);
        res.status(500).json({status:500, message:'Internal Server Error'})
    }
}

export const adminLogin = async(req,res,next) =>{
    const {username,password} = req.body
    try{
        if(!username || !password){
            return res.status(400).json({status:400, message:'All fileds are required'})

        }

        const admin = await Admin.findOne({username:username})
        if(!admin){
            return res.status(404).json({status:404, message:"Admin doesn't exist"})
        }

        const hashedPassword = await bcrypt.hash(password,12)

        const match = bcrypt.compare(hashedPassword,admin.password)

        if(!match){
            return res.status(403).json({status:403,message:'Wrong username or password'})
        }

        const token = jwt.sign({admin},process.env.SECRET_KEY,{expiresIn:'24h'})

        res.status(200).json({status:200, message:'Login successfully', token:token})

    }catch(err){
        console.log(err);
        res.status(500).json({status:500, message:'Internal Server Error'})
    }
}