import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { Email } from '../models/email';
import { emailImage } from './email/email-send-image';

const router = express.Router();

router.get('/api/users/email/image/:emailId', currentUser,emailImage,  (req, res) => {
  
  res.status(201).send("Image Email was sent!!!!!!!!");
  
 
});


export { router as EmailSendImageRouter };