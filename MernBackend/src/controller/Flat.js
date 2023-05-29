const FlatModel=require("../models/flat_register.js")
const RegisterStudent=require("../models/student_register.js");
const RegisterOwner=require("../models/owner_register")
const RegisterHostel=require("../models/hostel_register")
const RegisterFlat=require("../models/flat_register.js")
const axios=require("axios");
const { render } = require("ejs");

exports.create = async (req,res)=>{
    var flag2=false;
    
    const email = req.query.email;
    const RegistrationNumber=req.body.registrationNumber;
    const cRegistrationNumber=await RegisterFlat.findOne({registrationNumber:RegistrationNumber});
    const cId=await RegisterOwner.findOne({email:email});

    console.log(cRegistrationNumber);
    if(cRegistrationNumber===null){
        flag2=true;
    }

    if(flag2===true){
    // const cRoomName=await RegisterHostel.findOne({roomName:getRoomName})
        try{
          
          const imageNames = req.files.map((file) => file.originalname);
            const Flats=new RegisterFlat({
               BuildingName:req.body.BuildingName,
               registrationNumber:RegistrationNumber,
               area:req.body.area,
               address:req.body.address,
               city:req.body.city,
               ownerName:cId.name,
               ownerId:cId._id,
               ownerEmail:email,
               ownerPhone:cId.phone,
               rent:req.body.rent,
               roomName:req.body.roomName,
               roomNo:req.body.roomNo,
               rules:req.body.rules,
               facility:req.body.facility,
               googleMapLink:req.body.googleMapLink,
               images: imageNames 
            }) 
            const registered=await Flats.save();
            res.redirect("/flat_index?email=" + encodeURIComponent(email))
        }
        catch(e){
            res.status(400).send(e);
        }
    }
    else{
        res.render("already_exist");
    }
}

exports.find = async(req, res,getEmail)=>{
      try{
        const email = req.query.email;
        const flats=await FlatModel.find({ownerEmail: email});
        if(flats){
          console.log(flats);
          res.render("flat_index", { flats, email: email });
        }
        else{
            res.redirect("/add_flat?email=" + encodeURIComponent(email))
            // render("Flat_form",{email:email});
        }
      }
      catch(err)
      {
        res.send(err);
      }        
    }

    
    // Update a new idetified user by user id
    exports.edit = async (req, res)=>{
        // try{
        //     const result=await FlatModel.findById(req.params.id);
        //     res.render("Update_flat",{flats:result});
        // }
        // catch(err){
        //     res.send(err);
        // }
        try {
          const flatId = req.params.id;
      
          // Retrieve the flat from the database by its ID
          const flats = await RegisterFlat.findById(flatId);
      
          if (!flats) {
            return res.status(404).send('Flat not found');
          }
      
          res.render('Update_flat', { flats });
        } catch (error) {
          console.error('Failed to retrieve flat for update:', error);
          res.status(500).send('Internal Server Error');
        }
    }
    
    exports.update = async (req, res) => {
        
        try {
          const flatId = req.params.id;

          // Find and update the flat in the database using findByIdAndUpdate
          const updatedFlat = await RegisterFlat.findByIdAndUpdate(flatId, {
            BuildingName: req.body.BuildingName,
            registrationNumber: req.body.registrationNumber,
            area:req.body.area,
            address:req.body.address,
            city:req.body.city,
            rent:req.body.rent,
            roomName:req.body.roomName,
            roomNo:req.body.roomNo,
            facility:req.body.facility,
            rules:req.body.rules
          }, { new: true });
          if (!updatedFlat) {
            return res.status(404).send('Flat not found');
          }
          const email=updatedFlat.ownerEmail;
          res.redirect("/flat_index?email=" + encodeURIComponent(email))
          
        } catch (error) {
          console.error('Failed to update flat:', error);
          res.status(500).send('Internal Server Error');
        }
      };
      
        
  
    
    // Delete a user with specified user id in the request
    exports.delete =async (req, res)=>{
        try{
        const id = req.params.id;
        console.log(id);
        const e=await FlatModel.findById(id);
        const email=e.ownerEmail;
       const result= await FlatModel.findByIdAndDelete(id);
       res.redirect("/flat_index?email=" + encodeURIComponent(email))
      }
      catch(err){
        res.send(err);
      }
    }

    exports.details=async(req,res)=>{
        try{
            const result=await FlatModel.findById(req.params.id);
  
            res.render("flat_details",{flats:result});
        }
        catch(err){
            res.send(err);
        }
    }

module.export=this.delete,this.update,this.find,this.create,this.details;