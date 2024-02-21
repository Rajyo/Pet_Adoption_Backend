import User from "../models/User";
import bcrypt from "bcryptjs";
import { CustomError } from "../utils/custom-error.model"
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"


//register function
export const register = async(req: Request, res: Response, next: NextFunction) =>{
    try{
        const user = await User.findOne({email:req.body.email});

        if(user) throw new CustomError(404, "User already exists")

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash
        })

        await newUser.save();
        res.status(200).send("User has been created.");

    }catch(error: any){
        res.status(error.status).send(error.message);
    }
}


//login function
export const login = async(req: Request, res: Response, next: NextFunction) =>{
    console.log(req);
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user) throw new CustomError(404, "User not found!")

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password 
        );


        if(!isPasswordCorrect) throw new CustomError(400, "Wrong password or username")

        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT_SECRET || 'string', { expiresIn: '1d' });

        // const {_id,...otherDetails} = user._doc;
        const _id = user._id
        res.status(200).json(({ _id, token }))
    }catch(error: any){
        res.status(error.status).send(error.message);
    }
}


//logout function
export const logout = async(req: Request, res: Response, next: NextFunction) =>{
    try{
        res
          .clearCookie("access_token")
          .status(200)
          .json({data: "Cookie Deleted"});
    }catch(error: any){
        res.status(error.status).send(error.message);
    }
}