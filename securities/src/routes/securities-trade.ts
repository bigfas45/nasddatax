import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';


const router = express.Router();


router.get('/api/securities/trades/:symbol', currentUser, (req: Request, res: Response) => {
  const { symbol } = req.params
   let sql =
    'SELECT market_activity_sheet.`DATE` ,market_activity_sheet.`SECURITY`,market_activity_sheet.`SYMBOL`,market_activity_sheet.`CLOSE_PRICE`,market_activity_sheet.`DEALS`,market_activity_sheet.`VOLUME`,market_activity_sheet.`VALUE`, general_market_summary.`Open Price`as open FROM `market_activity_sheet` INNER JOIN general_market_summary ON market_activity_sheet.SYMBOL = general_market_summary.Security WHERE market_activity_sheet.`SYMBOL`=? AND market_activity_sheet.DATE = general_market_summary.Date ORDER BY DATE ASC ';
  let query = db.query(sql,[symbol], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    } else {
      return res.json(results);
    }
  });
})

export { router as TradeRouter };