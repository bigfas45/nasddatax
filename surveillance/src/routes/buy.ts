import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';


const router = express.Router();


router.get('/api/surveillance/buy/now/:account/:security', currentUser, (req: Request, res: Response) => {
  const { account,security } = req.params;
   let sql =
    'SELECT `SYMBOL`,`TRADE DATE` as tradeDate, `TO ACCOUNT` as toaccount, `TO MEMBER` as tomember, `FROM ACCOUNT` as fromaccount, `FROM MEMBER` as frommember, `VOLUME`, `PRICE` FROM `data`  WHERE SYMBOL = ? AND  `TO ACCOUNT` =?  ORDER BY `id` DESC';
  let query = db.query(sql,[security, account], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    } else {
      return res.json(results);
    }
  });
})

export { router as BuyRouter };