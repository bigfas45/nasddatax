import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { Email } from '../models/email';
import { emailPi } from './email/email-send-company_sec';

const router = express.Router();

router.get('/api/users/email/companysec/:emailId', currentUser,emailPi, (req, res) => {
  
  
  
  res.status(201).send("All Email was sent!!!!!!!!");
  
 
});


export { router as EmailSendAllRouter };