import questionModel from "../models/question.model.js";
import optionModel from "../models/option.model.js";

//Home Controller
export const home = (req, res) => {
    res.status(200).json(
        {"message": "Welcome to Polling System"}
    )
}

//Create a question
export const create = async (req, res) => {
    try {
        const { description, questionCanBeDeleted } = req.body;
        console.log(req.body);
        // Check if the description is provided
        if (!description) {
            return res.status(400).json({ error: "Description is required" });
        }

        // Create the question
        const createdQuestion = await questionModel.create({
            description,
            questionCanBeDeleted: questionCanBeDeleted,
        });

        return res.status(201).json({
            message: "Question created successfully :)",
            data: createdQuestion
        });
    } catch (error) {
        console.error("Error in creating question :(", error);
        return res.status(500).json({ error: "Internal server error :|" });
    }
};

//View a Question with options
export const view = async (req, res) => {
    try {
        const id = req.params.id;
        const question = await questionModel.findById(id).populate('optionList');

        console.log("Fetched Question:", question); // Log the fetched question object

        if (!question) {
            return res.status(404).json({ error: "Question not found :(" });
        }

        return res.status(200).json({
            message: "Question found :)",
            data: question
        });
    } catch (err) {
        console.error("Error:", err); 
        return res.status(403).json({
            message: "Error in viewing question :("
        });
    }
};


// Delete a question
export const delet = async(req, res) => {
    try{
        const questionId = req.params.id;
        const questionToDelete = await questionModel.findById(questionId);
        
        if(questionToDelete && questionToDelete.questionCanBeDeleted){
            for( const opt of questionToDelete.optionList){
                await optionModel.findByIdAndDelete(opt);
            }
            await questionModel.deleteOne({ _id: questionId });

        }
// if attribute "questionCanBeDeleted" is set to false
        if(! questionToDelete.questionCanBeDeleted){
            return res.status(200).json( {
                message:"Question  can not be deleted  its option has some vote(s) "
            })   
    
           }
         return res.status(200).json( {
              message:"Question and its options are successfully deleted :)"
          })   

    }catch(err){
        console.log(err)
        return res.status(409).json({
            message:"Error in deleting question :("
        })
}
}    
// export const delet = async (req, res) => {
//     try {
//         const questionId = req.params.id;
//         const questionToDelete = await questionModel.findById(questionId);

//         if (!questionToDelete) {
//             return res.status(404).json({ error: "Question not found" });
//         }

//         if (questionToDelete.questionCanBeDeleted) {
//             // Check if optionList is an array
//             if (!Array.isArray(questionToDelete.optionList)) {
//                 // Handle the case where optionList is not an array
//                 throw new Error("Option list is not an array");
//             }

//               // Iterate over each option ID and delete the corresponding option
//               for (const optId of questionToDelete.optionList) {
//                 await optionModel.findByIdAndDelete(optId);
//             }


//             await questionModel.deleteOne({ _id: questionId });

//             return res.status(200).json({
//                 message: "Question and its options deleted successfully :)"
//             });
//         } else {
//             return res.status(200).json({
//                 message: "Question cannot be deleted; its options have votes"
//             });
//         }
//     } catch (err) {
//         console.error("Error in deleting question: ", err);
//         return res.status(500).json({
//             message: "Error in deleting question :("
//         });
//     }
// };

