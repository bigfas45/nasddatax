import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';

const router = express.Router();


router.get('/api/equity/inbox', currentUser, (req: Request, res: Response) => {

   let sql ='SELECT DISTINCT `Date` FROM `general_market_summary` ORDER BY Date DESC LIMIT 7';
  let query = db.query(sql, (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    } else {
      return res.json(results);
    }
  });

})

export { router as InboxRouter };