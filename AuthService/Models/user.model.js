// import mongoose from "mongoose";
const mongoose=require("mongoose")
const bcrypt  =require('bcrypt')
const jwt =require( 'jsonwebtoken')
const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
      role:{
        type:String,
        enum:["admin","customer"],
        default:"customer"
      }
})



UserSchema.pre("save",async function(next){
//his: Refers to the current Mongoose document instance that is being saved or updated.
    if(this.isModified("password"))
    {

        this.password=await bcrypt.hash(this.password,10);
       return  next();
    }
    next();

    // for the -ve check
    // if(!this.isModified("password")) 
    //     return next();
    //   this.password=await bcrypt.hash(this.password,10)
    //     next();
    

})


UserSchema.methods.IspasswordCorrect=async function(password)
{
    const status=await bcrypt.compare(password,this.password)
    return status;
}

UserSchema.methods.GenerateAccessToken=function () {
    return jwt.sign(
        {
        _id:this._id,
        email:this.email
    },
    process.env.JWT_SECRET,
    {
        expiresIn:"1d"
    }
   
)
}
 const User = mongoose.model("User", UserSchema)
 module.exports=User