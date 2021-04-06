import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';
var moment = require('moment');

const router = express.Router();


router.get('/api/equity/price/list', currentUser, (req: Request, res: Response) => {

 let sql =
    'SELECT `Security`,`Ref Price` as RefPrice,`Date`, `Bid Depth` as BidDepth,`Bid Price` as BidPrice, `Offer Price` as OfferPrice, `Offer Depth` as OfferDepth, `Close Price` as ClosePrice, `52 Week High Price` as T52WeekHighPrice, `52 Week Low Price` as T52WeekLowPrice FROM general_market_summary WHERE Date > "2020" ORDER BY DATE DESC ';
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

export { router as PriceListRouter };