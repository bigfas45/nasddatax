import express, {Request, Response, NextFunction} from 'express';
import { currentUser,NotFoundError } from '@nasddatax/common';

import { Bod} from '../models/bod'


const router = express.Router();


router.get('/api/surveillance/:account/:sec', currentUser, async (req: Request, res: Response) => {
  
  const { account, sec } = req.params;
  // @ts-ignore
  const bod = await Bod.find({ $or: [ { account: account }, { security: sec } ] });

    if (!bod) {
      throw new NotFoundError();
    }

    res.status(200).send(bod);
  

})

export { router as ListRouter };