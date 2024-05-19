import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    questionCanBeDeleted:{
        type: Boolean,
       default: true
    },
    optionList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option'
    }]
},
    {
    timestamps: true
})

const Question = mongoose.model('Question', questionSchema);
export default Question;