import express from "express";
import * as questionController from "../controllers/question.controller.js";
import questionRoutes from "../routes/question.route.js";
import optionRoutes from "../routes/option.route.js";

const router = express.Router();

router.get('/',questionController.home);
router.use('/questions', questionRoutes);
router.use('/options', optionRoutes);

export default router;



