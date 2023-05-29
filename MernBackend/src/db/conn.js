const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/hostelitez",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
  console.log("Connection SuccessFull");
}).catch((error)=>{
  console.log("Connection Failed");
  console.log(error);
});
