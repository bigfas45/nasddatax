import express, {Request, Response, NextFunction} from 'express';
import { currentUser,NotFoundError } from '@nasddatax/common';
import { Bod} from '../models/bod'

const router = express.Router();


router.get('/api/surveillance/name/get/:account', currentUser, async(req: Request, res: Response) => {

  const { account } = req.params;
 // @ts-ignore
   const bod = await Bod.findOne({account: account})

    if (!bod) {
      throw new NotFoundError();
    }

    res.status(200).send(bod);

})

export { router as NameRouter };