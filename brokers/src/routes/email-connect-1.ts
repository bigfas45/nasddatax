import express, {Request, Response, NextFunction} from 'express';
import {email} from './email.ts/email-user-loging-details'


const router = express.Router();


router.get('/api/brokers/connect/email1/:id', email, (req: Request, res: Response) => {

  res.send("TestSEC");

})

export { router as IndexEmail1Router };