import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/user', userController.createUser);

export default router;
