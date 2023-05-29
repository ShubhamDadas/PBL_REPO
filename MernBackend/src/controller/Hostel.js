const FlatModel=require("../models/flat_register.js")
const RegisterStudent=require("../models/student_register.js");
const RegisterOwner=require("../models/owner_register")
const HostelModel=require("../models/hostel_register")
const RegisterFlat=require("../models/flat_register.js")
const axios=require("axios");

const RegisterHostel = require("../models/hostel_register");


exports.create = async (req,res)=>{
    // validate request
                const email=req.query.email;
                var flag1;
                var flag2;
            
                const getRegistrationNumber=req.body.registrationNumber;
                const getroomname=req.body.roomName;
                const str=getRegistrationNumber+getroomname;
                
                const cRegistrationNumber=await HostelModel.findOne({concat:str});
                const cId=await RegisterOwner.findOne({email:email});
                if(cRegistrationNumber){
                        flag2=true;
                }
                else{
                        flag2=false;
                }
                
                if(flag2===false){
                // const cRoomName=await RegisterHostel.findOne({roomName:getRoomName})
                    try{
                        const imageNames = req.files.map((file) => file.originalname);
                        const hostel=new RegisterHostel({
                           BuildingName:req.body.BuildingName,
                           registrationNumber:getRegistrationNumber,
                           area:req.body.area,
                           address:req.body.address,
                           city:req.body.city,
                           concat:str,
                           ownerName:cId.name,
                           ownerId:cId._id,
                           cotNo:req.body.cotNo,
                           ownerEmail:email,
                           ownerPhone:cId.phone,
                           rent:req.body.rent,
                           roomName:req.body.roomName,
                           roomNo:req.body.roomNo,
                           rules:req.body.rules,
                           googleMapLink:req.body.googleMapLink,
                           facility:req.body.facility,
                           images: imageNames
                        })
                        const registered=await hostel.save();
                        res.redirect("/hostel_index?email=" + encodeURIComponent(email))
                    }
                    catch(e){
                        res.status(400).send(e);
                    }
                }
                else{
                    res.send("This room is already registered"); 
                }

}

// retrieve and return all users/ retrive and return a single user
exports.find = async (req, res)=>{
    try{
        const email = req.query.email;
        const flats=await HostelModel.find({ownerEmail: email});
        if(flats){
          console.log(flats);
          res.render("hostel_index", { flats, email: email });
        }
        else{
            res.redirect("/add_hostel?email=" + encodeURIComponent(email))
        }
      }
      catch(err)
      {
        res.send(err);
      }
}

exports.edit=async(req,res)=>{
    try {
        const hostelId = req.params.id;
    
        // Retrieve the flat from the database by its ID
        const flats = await RegisterHostel.findById(hostelId);
    
        if (!flats) {
          return res.status(404).send('Flat not found');
        }
    
        res.render('Update_hostel', { flats });
      } catch (error) {
        console.error('Failed to retrieve flat for update:', error);
        res.status(500).send('Internal Server Error');
      }
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    RegisterHostel.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete =async (req, res)=>{
    try{
        const id = req.params.id;
        console.log(id);
        const e=await HostelModel.findById(id);
        const email=e.ownerEmail;
       const result= await HostelModel.findByIdAndDelete(id);
       res.redirect("/hostel_index?email=" + encodeURIComponent(email))
      }
      catch(err){
        res.send(err);
      }
}

exports.details=async(req,res)=>{
    try{
        const result=await HostelModel.findById(req.params.id);
        res.render("hostel_details",{flats:result});
    }
    catch(err){
        res.send(err);
    }
}

module.export=this.delete,this.update,this.find,this.create,this.details;