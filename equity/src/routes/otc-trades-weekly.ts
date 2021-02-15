import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';
var moment = require('moment');

const router = express.Router();


router.get('/api/equity/otctotaldealsweek', currentUser, (req: Request, res: Response) => {

var date = new Date();
  var firstDay =  moment().startOf('isoweek').toDate();
  var lastDay =moment().endOf('isoweek').toDate();


  
  

 var momentDate1 = moment(firstDay);
  var momentDate2 = moment(lastDay);

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

export { router as OtctotaldealsweekRouter };