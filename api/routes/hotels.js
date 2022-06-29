import  express  from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

//CREATE

// connecting to db creting collections so it's gonna take a lot of time
//we have to use async because different taches have to run:
router.post("/", async (req,res) => {  

    const newHotel = new Hotel(req.body)

    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
        
    }catch(err){

        res.status(500).json(err)

    }

});
//UPDATE
router.put("/:id", async (req,res) => {  

    const updatedHotel = new Hotel(req.body)

    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
        res.status(200).json(savedHotel)
        
    }catch(err){

        res.status(500).json(err)

    }

});
//DELETE
router.delete("/:id", async (req,res) => {  

    const deletedHotel = new Hotel(req.body)

    try{
        const deletedHotel = await Hotel.findByIdAndDelete(
            req.params.id)
        res.status(200).json("hotel deleted succefully")
        
    }catch(err){

        res.status(500).json(err)

    }

});
//GET
router.get("/:id", async (req,res) => {  

    const getHotel = new Hotel(req.body)

    try{
        const getHotel = await Hotel.findById(
            req.params.id)
        res.status(200).json(getHotel)
        
    }catch(err){

        res.status(500).json(err)

    }

});
//GETALL
router.get("/", async (req,res) => {  

    const getAllHotels = new Hotel(req.body)

    try{
       const getAllHotels = await Hotel.find()
        res.status(200).json(getAllHotels)
        
    }catch(err){

        res.status(500).json(err)

    }

});




export default router