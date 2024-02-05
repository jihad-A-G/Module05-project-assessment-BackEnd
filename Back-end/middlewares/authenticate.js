
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const authenticateAdmin = async(req,res,next) =>{
    const token  = req.headers['authorization']
    try {
        if(!token){
            return res.status(404).json({status:404, message:'Invalid token'})
        }

        const decoded =  jwt.verify(token.split(' ')[1],process.env.SECRET_KEY )

        if(!decoded){
            return res.status(404).json({status:404, message:'Admin not found'})
        }

        req.admin = decoded.admin
        // console.log(decoded);
        next()
        
    } catch (err) {
        console.log(err);
        res.status(500).json({status:500, message:'Internal Server Error'})
    }
}