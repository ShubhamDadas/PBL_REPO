const express=require("express");
const path=require("path");
const ejs=require("ejs");
const multer=require("multer");
const app=express();
const bodyParser=require('body-parser');
const FlatController=require("../src/controller/Flat.js");
const HostelController=require("../src/controller/Hostel.js");
const route=require("./routes/flat_router.js")
const router=require("./routes/route.js")
const axios=require("axios");
const methodOverride=require("method-override");
const bcrypt=require("bcrypt");
const session=require("express-session");
const RegisterFlat=require("../src/models/flat_register.js")

app.use('/js', express.static(path.resolve(__dirname, "public/js")))

// const RegisterHostel=require("../src/models/hostel_register.js")
    
require("./db/conn");


//Used to connect to local host or hosting to globally
const port = process.env.PORT || 3000;

const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","ejs");
app.set("views",template_path);
// hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/student_register",(req,res)=>{
    res.render("Student_register");
});

//create a new user in our database
app.post("/student_register",async(req,res)=>{
    const get_email=req.body.email;
    const em=await RegisterStudent.findOne({email:get_email});
    if(em){
        res.render("already_exist");
    }
    else{
    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
        if(password===cpassword){
            const register_Student=new RegisterStudent({
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            })

            //password hashing
           const registered= await register_Student.save();
           res.render("R_success");
        }
        else{
          res.render("invalid");
        }
    }
    catch(err){
        res.status(400).send(err);
    }
}
});

app.get("/student_login",(req,res)=>{
    res.render("Student_login");
});

app.get("/logout",(req,res)=>{
  res.redirect("/");
})

app.post("/student_login",async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
        // console.log(`${email} and password is ${password}`);

      const student_email= await RegisterStudent.findOne({email:email});

      if(student_email.password===password){
        res.redirect("/student_index");
      }
      else{
        res.render("invalid");
      }
    }
    catch(err){
        res.status(400).send(err)
    }
});

app.get("/owner_register",(req,res)=>{
    res.render("Owner_register");
});

//create a new user in our database
app.post("/owner_register",async(req,res)=>{
    const get_email=req.body.email;
    const em=await RegisterOwner.findOne({email:get_email});
    if(em){
        res.render("already_exist");
    }
    else{
    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
        if(password===cpassword){
            const register_owner=new RegisterOwner({
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            })

            //password hashing

           const registered= await register_owner.save();
           res.render("R_success");
        }
        else{
            res.render("invalid");
        }
    }
    catch(err){
        res.status(400).send(err);
    }
}
});

//login check
app.get("/login",(req,res)=>{
    res.send("Select from dropdown");
});

app.get("/contact",(req,res)=>{
  res.render("contact");
})

app.get("/owner_login",(req,res)=>{
    res.render("Owner_login");
});

app.get("/owner_index",async(req,res)=>{
    const email=req.query.email;
   res.render("Owner_index",{email:email});
});
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.post("/owner_login",async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
        
      const owner_email= await RegisterOwner.findOne({email:email});
      console.log(owner_email);
      
      if(owner_email.password===password)
      {
        req.session.email = email;
        console.log(req.session.email);
        res.redirect(`/owner_index?email=${encodeURIComponent(email)}`);
      }
      else
      {
        res.render("invalid");
      }
    }
    catch(err){
        res.status(400).send(err)
    }
    
});

app.get("/about",async(req,res)=>{
    res.render("about");
})


const RegisterStudent=require("./models/student_register.js");
const RegisterOwner=require("./models/owner_register.js")
const RegisterHostel=require("./models/hostel_register.js");
const { Session } = require("inspector");

app.use(methodOverride('_method'));

app.use('/', require('../src/routes/flat_router.js'))
app.use('/',require('../src/routes/route.js'))

app.get("/student_index",async(req,res)=>{
    try{
        res.render("Student_index");
    }
    catch(err){
        res.send(err);
    }
})

app.get("/search_flat",async (req,res)=>{
    try {
        const searchCity = req.query.city || "";
        const searchArea = req.query.area || "";
        var search3=req.query.myselect;

        if(search3==="rent"){
          const flats = await RegisterFlat.find({
          $and: [
            { city: { $regex: searchCity, $options: "i" } },
            { area: { $regex: searchArea, $options: "i" } }
          ]
        }).sort({rent:1});
        console.log(flats);
        res.render("search_flat", { flats });
    }
    else{
        const flats = await RegisterFlat.find({
            $and: [
              { city: { $regex: searchCity, $options: "i" } },
              { area: { $regex: searchArea, $options: "i" } }
            ]
          }).sort({roomNo:1});
          console.log(flats);
          res.render("search_flat", { flats });
    }
      } catch (error) {
        res.send(error);
      }
})

app.get("/search_hostel",async (req,res)=>{
    try {
        const searchCity = req.query.city || "";
        const searchArea = req.query.area || "";
        var search3= req.query.myselect;
        if(search3==="rent"){
        const hostels = await RegisterHostel.find({
          $and: [
            { city: { $regex: searchCity, $options: "i" } },
            { area: { $regex: searchArea, $options: "i" } }
          ]
        }).sort({rent:1});
        res.render("search_hostel", { hostels });
    }
    else{
        const hostels = await RegisterHostel.find({
            $and: [
              { city: { $regex: searchCity, $options: "i" } },
              { area: { $regex: searchArea, $options: "i" } }
            ]
          }).sort({cotNo:1});
          res.render("search_hostel", { hostels });
    }
      } catch (error) {
        res.send(error);
      }
})



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images/'); // Set the destination folder for uploaded images
    },
    filename: (req, file, cb) => {
      const fileName = Date.now() + '-' + file.originalname; // Generate a unique filename
      cb(null, fileName);
    }
  });
  
  app.get("*",(req,res)=>{
    res.render("404");
  })

app.use('/js',express.static(path.resolve(__dirname,"public/js")));
const flat_path=path.join(__dirname,"../routes/flat_router.js");
const hotstel_path=path.join(__dirname,"../routes/route.js");
app.use(express.static(flat_path));
app.use(express.static(hotstel_path));

app.listen(port,()=>{
    console.log("Server is running at port no "+port);
})