import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogShema = new Schema({
    title :{
        type : String, 
        required : true,
    },
    description :{
        type : String, 
        required : true,
    },
    // for many to one relation just use object
    user :{
        type : mongoose.Types.ObjectId,       /// use to make reference to the particular use
        ref : "User",      /// database name from which we will get reference
        required : true,
    }
})

export default mongoose.model("blog", blogShema);