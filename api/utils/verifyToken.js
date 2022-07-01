import { createError } from "../utils/error.js";
import  jwt  from "jsonwebtoken";

// first thing we have to verify our authentication
export const verifyTokon = (req,res,next)=>{
    // take the token from cookies
    const token = req.cookies.access_token;
    // if there is no token it means we are not authenticated
    if(!token){
        return next(createError(401,"You are not authenticated!"))
    }
    // if there is a token it deosn't mean it's the correct one so we have to verify it
    jwt.verify(token, process.env.JWT, (err, user)=>{


        if(err)
            // if ther's an error 
            return next(createError(403,"Token is not valid"));
            // if there's no error we will set a new request property
            req.newreq = user;
            next() //next operation if everything is good

        });
};


export const verifyUser = (req,res,next)=>{
    verifyTokon(req, res, ()=>{
        // we have to check if the id we have in token match the id we pass in params (/checkUser/:id)
        // if the are matched it means we are the owner
        // also the admin have the right to delete the user
        if(req.newreq.id === req.params.id || req.newreq.isAdmin){
            next();
        }else{
            return next(createError(403,"You are not authorized to delete!"));
        }
    });
}

export const verifyAdmin = (req,res,next)=>{
    verifyTokon(req, res, ()=>{

        // we have to ckech if the user is an admin 
        if(req.newreq.isAdmin){
            next();
        }else{
            return next(createError(403,"You are not authorized to delete!"));
        }
    });
}