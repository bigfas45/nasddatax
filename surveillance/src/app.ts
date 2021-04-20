import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@nasddatax/common';

import { IndexRouter } from './routes/index';



const app = express();
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: false,
    // secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(IndexRouter);



app.get('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
