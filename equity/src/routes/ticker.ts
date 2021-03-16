import express, { Request, Response, NextFunction } from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';
// import { datetime } from 'node-datetime';
import moment from 'moment';

const router = express.Router();

router.get('/api/equity/ticker', currentUser, (req: Request, res: Response) => {
  let number;
    let date2 = new Date().getHours();
    let weekday = new Date().toLocaleString('en-us', {  weekday: 'long' });

    if (date2 >= 1 && date2 < 16   && weekday == 'Monday') {
         number = -3;
    }else{
        number = -1;
    }

  if (date2 >= 1 && date2 < 16   && weekday !=='Saturday' && weekday !=='Sunday'  ) {
   
   var d = new Date(); // Today!
    d.setDate(d.getDate() - number); // Yesterday!
    var formatted = moment.utc(d).format('YYYY-MM-DD');
    
  }else{
    
    var d = new Date(); // Today!
    d.setDate(d.getDate() - 0); // Yesterday!

    var formatted = moment.utc(d).format('YYYY-MM-DD');
  }
    let sql = "SELECT Date, `Security`,`Close Price` as close,`Change Percent` as percent FROM `general_market_summary` WHERE date = ? ";
   //@ts-ignore
  let query = db.query(sql, [formatted], (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: ' not found'
            });
        }else{
            return res.json(results)
        }
    });
});

export { router as TickerRouter };
