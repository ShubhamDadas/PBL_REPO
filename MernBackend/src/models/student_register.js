const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const validator=require('validator');
const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type: Number,
        required: true,
       unique: true,
        validate: {
        validator: function(value) {
        // Validate that the mobile number is exactly 10 digits
        return /^\d{10}$/.test(value);
      },
      message: props => `${props.value} is not a valid mobile number!`
    }
    },
    confirmpassword:{
        type:String,
        required:true,
        validate: {
            validator: function (password) {
              return password.length >= 6;
            },
            message: 'Password must be at least 6 characters long',
          }
    },
    role:{
        type:String,
        default:"Student"
    }
})

//hashing
//It will hash before save function in app.js
// studentSchema.pre("save",async function(next){

//     if(this.isModified("password")){

//     this.password=await bcrypt.hash(this.password,10);

//     this.confirmpassword=undefined;
//    }
//     //next() executes the next instructions in the app.js after hashing
//     next();

// })
//collection creation

const RegisterStudent=new mongoose.model("Student",studentSchema);

module.exports=RegisterStudent;