import questionModel from "../models/question.model.js";
import optionModel from "../models/option.model.js";

export const create = async (req, res) => {
    try {
        // Check if the option already exists
        let option = await optionModel.findOne({
            description: req.body.description,
            optionOf: req.params.id
        });

        // Create the option if it doesn't exist
        if (!option) {
            option = await optionModel.create({
                description: req.body.description,
                optionOf: req.params.id
            });
        }

        // Fetch the question
        const question = await questionModel.findById(req.params.id);

        // If question not found, return 404
        if (!question) {
            return res.status(404).json({ error: "Question not found :(" });
        }

        // Use $push to add the option ID to optionList array
       const updatedQuestion = await questionModel.findByIdAndUpdate(req.params.id, {
            $push: { optionList: option._id, options: option }},
            { new: true }
        ).populate('optionList'); // Populate the optionList to include the full option documents


        return res.status(201).json({
            message: "Option added to question successfully :)",
            description: updatedQuestion,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Add vote to the question
export const addVote = async(req, res) => {
    const option = await optionModel.findById(req.params.id);
    option.optionCanBeDeleted = false;
    const question = await questionModel.findById(option.optionOf);
    question.questionCanBeDeleted = false;
    const currentVoteCount =  await option.votes;
    option.votes = await  currentVoteCount + 1;
    await question.save();
    await option.save();

    // const option = await optionModel.findById(req.params.id);

    return res.status(200).json({
    message:" Option voted successfully :)",
    data: option
})
} 

//delete an option
export const deleteOption = async(req, res) => {
    const optionId = req.params.id;

    //fetch option
    const option = await optionModel.findById(optionId);

    if(!option){
        return res.status(204).json({ error: "Option not found" });
        // console.log(error);
    }

    if(option.optionCanBeDeleted){
       // Get the question ID from the option
       const questionId = option.optionOf;

        // Remove the option from the database
        await optionModel.findByIdAndDelete(optionId);

        // Remove the option reference from the question's optionList
        await questionModel.findByIdAndUpdate(questionId, {
            $pull: { optionList: optionId }
        });
        return res.status(200).json({
            message: "Option deleted successfully :)"
        });
    }
    else{
        return res.status(200).json({
            messsage : "Option can not be deleted it has some vote(s)"
        })
    }
}