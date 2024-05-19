import express from "express";
import * as optionController from "../controllers/option.controller.js";

const router = express.Router();

// router to create option to a question
router.post('/:id/create',optionController.create);

//router to delete an option
router.get('/:id/delete' ,optionController.deleteOption);

// router to add vote to an option
router.get('/:id/addVote' , optionController.addVote);

export default router;
