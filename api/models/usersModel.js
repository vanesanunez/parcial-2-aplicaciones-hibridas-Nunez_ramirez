
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  dni: {
    type: Number,
    required: true,
     unique: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model('Users', userSchema)

