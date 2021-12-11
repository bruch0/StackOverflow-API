import express from 'express';
import * as questionController from '../controllers/questionController';

const router = express.Router();

router.post('/question', questionController.registerQuestion);

router.post('/question/:questionId', questionController.answerQuestion);

router.get('/question/:questionId', questionController.getQuestion);

router.get('/questions', questionController.getAllUnansweredQuestions);

router.put('/questions/:questionId/up-vote', questionController.voteQuestion);

router.put('/questions/:questionId/down-vote', questionController.voteQuestion);

export default router;
