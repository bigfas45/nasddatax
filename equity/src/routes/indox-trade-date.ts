import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';


const router = express.Router();


router.get('/api/equity/inbox/:date', currentUser, (req: Request, res: Response) => {
  const { date } = req.params
  
  let sql =
    'SELECT Date, `Security Name` as securityName ,`Security`,`Open Price` as open,`Close Price` as close,`52 Week High Price` I52WH,`52 Week Low Price` as I52WL FROM `general_market_summary` WHERE `Date`=?';
  let query = db.query(sql,[date], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    } else {
      return res.json(results);
    }
  });

})

export { router as InboxDateRouter };