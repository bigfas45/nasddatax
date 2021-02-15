import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';


const router = express.Router();


router.get('/api/brokers/test', currentUser, (req: Request, res: Response) => {

  res.send("TestSEC");

})

export { router as IndexRouter };