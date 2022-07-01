import  express  from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyTokon, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//whenever we make a request to this endpoint: ( /checkauthentication )
//it's gonna go to verifyToken and if everything is ok 
//it will run next() an we are gonna come back to apply this next function {(req, res, next)} 
router.get("/checkauthentication", verifyTokon, (req, res, next)=>{
    res.send("Hello user, you are logged in!")

})
router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
    res.send("Hello user, you are logged in and you can delete your account!")

})
router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
    res.send("Hello user, you are logged in and you can delete all accounts!")

})
//UPDATE
router.put("/:id", updateUser);
//DELETE
router.delete("/:id", deleteUser);
//GET
router.get("/:id", getUser);
//GETALL
router.get("/", getUsers);


export default router