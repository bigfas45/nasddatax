import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';
var moment = require('moment');

const router = express.Router();


router.get('/api/equity/otctotaldeals', currentUser, (req: Request, res: Response) => {

 var startYearDay = new Date(new Date().getFullYear(), 0, 1);
  var endYearDay = new Date(new Date().getFullYear(), 0, 366);

  var momentDate1 = moment(startYearDay);
  var momentDate2 = moment(endYearDay);

  var start = momentDate1.format('YYYY-MM-DD');
  var end = momentDate2.format('YYYY-MM-DD');

  

  let sql =
    'SELECT `DATE`,`SECURITY`,`SYMBOL`,`CLOSE_PRICE`,SUM(`DEALS`) as sumDeals,SUM(`VOLUME`) as sumVolume,SUM(`VALUE`) as sumValue,MAX(`CLOSE_PRICE`) as MAX_CLOSE_PRICE,MIN(`CLOSE_PRICE`) as MIN_CLOSE_PRICE FROM market_activity_sheet WHERE `DATE` BETWEEN ? AND ? GROUP BY `SECURITY`';
  let query = db.query(sql, [start, end], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    } else {
      return res.json(results);
    }
  });

})

export { router as OtctotaldealsRouter };