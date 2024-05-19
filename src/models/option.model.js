import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    votes:{
        type: Number,
        default: 0
    },
    optionCanBeDeleted:{
        type:Boolean,
        default:true
    },
    optionOf:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    }
},
{
    timestamps:true
})

const Option = mongoose.model('Option', optionSchema);
export default Option;