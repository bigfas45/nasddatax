import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';

const router = express.Router();


router.get('/api/securities/performance/:date1/:date2', currentUser, (req: Request, res: Response) => {
const { date1, date2 } = req.params
   let sql =
    'SELECT general_market_summary.Date as Date1, general_market_summary.Security, general_market_summary.`Security Name` as security_name, general_market_summary.`Open Price` as openprice , general_market_summary.`Close Price` as closeprice, general_market_summary_2.Date, general_market_summary_2.Security, general_market_summary_2.`Open Price` as openprice2 , general_market_summary_2.`Close Price` as closeprice2, market_activity_sheet.SYMBOL as symbol2 , SUM(market_activity_sheet.VOLUME) as volume FROM `general_market_summary` LEFT JOIN general_market_summary_2 ON general_market_summary.Security = general_market_summary_2.Security RIGHT JOIN market_activity_sheet ON market_activity_sheet.SYMBOL = general_market_summary.Security WHERE general_market_summary.Date=? AND general_market_summary_2.Date =? AND market_activity_sheet.DATE  BETWEEN ? AND ? GROUP By general_market_summary.Security ORDER BY general_market_summary.Security';
  let query = db.query(sql,[date1, date2,date1,date2], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    } else {
      return res.json(results);
    }
  });

})

export { router as PerformanceRouter };