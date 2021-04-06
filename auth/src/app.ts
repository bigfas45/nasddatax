import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { UserUpdateRouter } from './routes/update';
import { ListUserRouter } from './routes/list';
import { UserRouter } from './routes/user';
import { EmailRouter } from './routes/create-email';
import { EmailUpdateRouter } from './routes/update-email';
import { EmailListRouter } from './routes/emails';

import { EmailGetRouter } from './routes/get-email-id';
import { EmailGetFileRouter } from './routes/read-email-file';
import { EmailSendOpsRouter } from './routes/send-email-marketoperation';
import { EmailSendPIRouter } from './routes/send-email-pi';
import { EmailSendImageRouter } from './routes/send-email-image';
import { EmailSendAllRouter } from './routes/email-all-participant';
import { UserEmailGetRouter } from './routes/password-reset';
import { UserActivitiesRouter } from './routes/UserActivities';

import { errorHandler, NotFoundError } from '@nasddatax/common';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(UserUpdateRouter);
app.use(ListUserRouter);
app.use(UserRouter);
app.use(EmailRouter);
app.use(EmailUpdateRouter);
app.use(EmailListRouter);
app.use(EmailGetRouter);
app.use(EmailGetFileRouter);
app.use(EmailSendOpsRouter);
app.use(EmailSendPIRouter);
app.use(EmailSendImageRouter);
app.use(UserActivitiesRouter);
app.use(EmailSendAllRouter);
app.use(UserEmailGetRouter);

app.get('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
