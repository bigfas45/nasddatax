import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';


const router = express.Router();


router.get('/api/securities/trades/:symbol', currentUser, (req: Request, res: Response) => {
  const { symbol } = req.params
   let sql =
    'SELECT * FROM `market_activity_sheet` WHERE `SYMBOL`=? ORDER BY DATE ASC ';
  let query = db.query(sql,[symbol], (err, results) => {
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

export { router as TradeRouter };