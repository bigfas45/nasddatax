import express, { Request, Response, NextFunction } from 'express';
import { currentUser } from '@nasddatax/common';
import { db } from '../models/mysql';
// import { datetime } from 'node-datetime';
import moment from 'moment';

const router = express.Router();

router.get('/api/equity/ticker', currentUser, (req: Request, res: Response) => {
  let sql =
    'SELECT DISTINCT Date FROM general_market_summary ORDER BY Date DESC LIMIT 1';
  let query = db.query(sql, (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'usi not found',
      });
    } else {
      // @ts-ignore
      results.forEach((element) => {
        let sql =
          'SELECT Date, `Security`,`Close Price` as close,`Change Percent` as percent FROM `general_market_summary` WHERE date = ? ';
        //@ts-ignore
        let query = db.query(sql, [element.Date], (err, results) => {
          if (err || !results) {
            return res.status(400).json({
              error: ' not found',
            });
          } else {
            return res.json(results);
          }
        });
      });
    }
  });
});

export { router as TickerRouter };
