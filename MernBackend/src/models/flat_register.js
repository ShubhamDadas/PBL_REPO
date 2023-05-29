const mongoose=require("mongoose");
const flatSchema=new mongoose.Schema({
    BuildingName:{
        type:String,
        required:true
    },
    registrationNumber:{
        type:String,required:true
    },
    area:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    ownerName:{
        type:String,
        required:true
    },
    ownerPhone:{
        type:Number,
        required:true
    },
    ownerEmail:{
        type:String,
        required:true
    },
    ownerId:{
        type:String,
        required:true
    },
    roomName:{
        type:String,
        required:true
    },
    roomNo:{
        type:Number,
        required:true
    },
    rent:{
        type:Number,
        required:true
    },
    rules:{
        type:String,
        required:true
    },
    facility:{
        type:String
    },
    googleMapLink: {
        type: String,
        deafult:"Not Available"
    },
    images: { type: Array }
})

const RegisterFlat=new mongoose.model("Flats",flatSchema);

module.exports=RegisterFlat;