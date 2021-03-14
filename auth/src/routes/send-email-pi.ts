import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { Email } from '../models/email';
import { emailOps } from './email/email-send-ops';

const router = express.Router();

router.get('/api/users/email/pi/:emailId', currentUser, emailOps,  (req, res) => {
  
  res.status(201).send("Pi Email was sent!!!!!!!!");
  
 
});


export { router as EmailSendPIRouter };