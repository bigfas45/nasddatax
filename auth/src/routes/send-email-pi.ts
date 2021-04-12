import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { Email } from '../models/email';
import { emailPi } from './email/email-send-pi';

const router = express.Router();

router.get('/api/users/email/pi/:emailId', currentUser, emailPi,  (req, res) => {
  
  res.status(201).send("Pi Email was sent!!!!!!!!");
  
 
});


export { router as EmailSendPIRouter };