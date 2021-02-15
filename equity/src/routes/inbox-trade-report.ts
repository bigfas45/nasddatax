import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';


const router = express.Router();


router.get('/api/equity/inbox/:date/:date2', currentUser, (req: Request, res: Response) => {
  const { date } = req.params;
  const { date2 } = req.params;
  
  let sql =
    'SELECT market_activity_sheet.SECURITY, market_activity_sheet.SYMBOL, market_activity_sheet.CLOSE_PRICE, market_activity_sheet.DEALS, market_activity_sheet.VOLUME, market_activity_sheet.VALUE , general_market_summary.`Ref Price` as refprice FROM `market_activity_sheet` INNER JOIN security_to_traded ON market_activity_sheet.SYMBOL=security_to_traded.`COL 11` INNER JOIN general_market_summary ON security_to_traded.`COL 11` = general_market_summary.Security WHERE market_activity_sheet.`DATE`=? AND general_market_summary.Date=?';
  let query = db.query(sql,[date, date2], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    } else {
      return res.json(results);
    }
  });

})

export { router as InboxDateReportRouter };