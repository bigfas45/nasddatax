import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';


const router = express.Router();


router.get('/api/securities/corporate/action', currentUser, (req: Request, res: Response) => {

 let sql =
    'SELECT * FROM `corporate_actions`';
  let query = db.query(sql, (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    } else {
      return res.json(results);
    }
  });
db.destroy();
})

export { router as CorporateActionRouter };