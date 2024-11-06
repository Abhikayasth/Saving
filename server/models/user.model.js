import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken"


dotenv.config()

const userSchema = new Schema({
  fullName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance:{
    type: Number,
    default: 0,
  },
  refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// console.log(process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRY)
// console.log(process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRY)

userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return  next()

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
  
  // console.log(this._id, this.email, this.fullName);

    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        fullName: this.fullName,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    ); 
}

userSchema.methods.generateRefreshToken = function () {
  //  console.log(this._id);
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export default model('User', userSchema);