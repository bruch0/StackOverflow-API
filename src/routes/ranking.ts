import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('/ranking', userController.getTopUsers);

export default router;
