import express from 'express';
import * as questionController from '../controllers/questionController';

const router = express.Router();

router.post('/question', questionController.registerQuestion);

router.post('/question/:questionId', questionController.answerQuestion);

router.get('/question/:questionId', questionController.getQuestion);

export default router;
