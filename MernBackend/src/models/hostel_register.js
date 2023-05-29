const mongoose=require("mongoose");
const HostelSchema=new mongoose.Schema({
    BuildingName:{
        type:String,
        required:true
    },
    registrationNumber:{
        type:String,
        required:true
    },
    concat:{
        type:String,
        required:true
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
    ownerId:{
        type:String,
        required:true
    },
    ownerEmail:{
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
    cotNo:{
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

const RegisterHostel=new mongoose.model("hostels",HostelSchema);

module.exports=RegisterHostel;