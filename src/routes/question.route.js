import express from "express";
import * as questionController from "../controllers/question.controller.js";
// import * as optionController from "../controllers/option.controller.js";

const router = express.Router();

// router to view question
router.get('/:id', questionController.view);

// router to create a question
router.post('/create', questionController.create);

// router to delete a question
router.get('/:id/delete' ,questionController.delet);

export default router;

