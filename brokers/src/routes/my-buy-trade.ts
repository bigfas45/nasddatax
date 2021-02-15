import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { db } from '../models/mysql';
var moment = require('moment');

const router = express.Router();


router.get('/api/brokers/test', currentUser, (req: Request, res: Response) => {

  res.send("TestSEC");

})

export { router as IndexRouter };