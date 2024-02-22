import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";
import { CustomError } from './custom-error.model';

interface IDecode {
    isAdmin: boolean,
    id: string,
    iat: number,
    exp: number
};

export interface RequestWithUserRole extends Request {
    user?: IDecode,
}

//verify user function
export const verifyUser = (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) throw new CustomError(403, "Not authorized. No token")

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            const token = req.headers.authorization.split(" ")[1]

            if (!token) {
                throw new CustomError(403, 'Token not found')
            }

            try {
                var decodedData = <IDecode>jwt.verify(token, process.env.JWT_SECRET || 'string')
            } catch (error: any) {
                throw new CustomError(403, "Token is not valid")
            }


            req.user = decodedData;
            // console.log("verifyUser", req.user)
            if (req.user.id || req.user.isAdmin) {
                next();
            } else {
                throw new CustomError(403, "You are not authorized")
            }
        }
    } catch (error: any) {
        res.status(error.status).send(error.message);
    }

}


//verify admin function
export const verifyAdmin = (req: RequestWithUserRole, res: Response, next: NextFunction) => {

    try {
        if (!req.headers.authorization) throw new CustomError(403, "Not authorized. No token")

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            const token = req.headers.authorization.split(" ")[1]

            if (!token) {
                throw new CustomError(403, 'Token not found')
            }

            try {
                var decodedData = <IDecode>jwt.verify(token, process.env.JWT_SECRET || 'string')
            } catch (error: any) {
                throw new CustomError(403, "Token is not valid")
            }

            req.user = decodedData;
            if (req.user.isAdmin) {
                next();
            } else {
                throw new CustomError(403, "You are not authorized")
            }

        }
    } catch (error: any) {
        res.status(error.status).send(error.message);
    }

}
