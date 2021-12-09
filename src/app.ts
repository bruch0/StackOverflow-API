import express from 'express';
import cors from 'cors';

import userRoute from './routes/user';
import inexistentRoute from './routes/error';
import databaseError from './middlewares/databaseError';

const app = express();
app.use(express.json());
app.use(cors());

app.use(userRoute);

app.use(databaseError);
app.use(inexistentRoute);

export default app;
