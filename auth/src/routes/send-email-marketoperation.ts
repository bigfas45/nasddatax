import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { Email } from '../models/email';
import { emailOps } from './email/email-send-ops';

const router = express.Router();

router.get('/api/users/email/operations/:emailId', currentUser, emailOps,  (req, res) => {
  
  res.status(201).send("Email was sent!!!!!!!!");
  
 
});


export { router as EmailSendOpsRouter };