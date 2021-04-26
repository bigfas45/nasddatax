import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';


const router = express.Router();


router.get('/api/surveillance/sell/now/:account/:security', (req: Request, res: Response) => {
  const { account,security } = req.params;

  console.log(account);
   let sql =
    'SELECT `SYMBOL`, `TRADE DATE` as tradeDate, `FROM ACCOUNT` as fromaccount,`FROM MEMBER` as frommember,`TO ACCOUNT` as toaccount,`TO MEMBER` as tomember,`VOLUME`, `PRICE` FROM `data`  WHERE  SYMBOL =? AND  `FROM ACCOUNT` =?  ORDER BY `id` DESC';
  let query = db.query(sql,[security, account], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    } else {
      return res.json(results);
    }
  });
});

export { router as SellRouter };