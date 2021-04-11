import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';


const router = express.Router();


router.get('/api/securities/mcap/:symbol', currentUser, (req: Request, res: Response) => {
  const { symbol } = req.params
   let sql =
    'SELECT `Date`, `Security`, `Issued Shares`*`Close Price` as mcap  FROM `general_market_summary` WHERE `Security`=? ORDER BY Date DESC LIMIT 1';
  let query = db.query(sql,[symbol], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    } else {
      return res.json(results);
    }
  });
db.end();
})

export { router as SecurityMcapRouter };