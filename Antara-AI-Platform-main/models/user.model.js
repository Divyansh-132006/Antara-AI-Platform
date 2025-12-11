import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, 'Field is mandotary'],
            lowercase:true
        },
        username:{
             type:String,
            required:[true, 'Field is mandotary'],
            lowercase:true,
            unique:true
        },
        email:{
               type:String,
            required:[true, 'Field is mandotary'],
            lowercase:true,
            unique:true
        },
        password:{
            type:String,
            require:[true, 'Field is mandotary']
        }
        

    },
    {timestamps:true})

    const User = mongoose.model("User", userSchema)
    export default User