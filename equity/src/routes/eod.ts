import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';
var moment = require('moment');

const router = express.Router();


router.get('/api/equity/eod', currentUser, (req: Request, res: Response) => {

  let sql = 'SELECT `EXTERNAL TICKET` as EXTERNAL_TICKET,`TO MEMBER` as TO_MEMBER,`TO ACCOUNT` as TO_ACCOUNT,`TO REFERENCE` as TO_REFERENCE,`FROM MEMBER` as FROM_MEMBER,`FROM ACCOUNT` as FROM_ACCOUNT,`FROM REFERENCE` as FROM_REFERENCE,`SYMBOL`,`VOLUME`,`PRICE`,`TRADE DATE` as TRADE_DATE,`TRADE TIME` as TRADE_TIME,`SETTLEMENT DATE` as SETTLEMENT_DATE,`TOTAL VALUE` as TOTAL_VALUE,`INTEREST VALUE` as INTEREST_VALUE,`TRADE STATUS` as TRADE_STATUS FROM `data` WHERE 1';
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

export { router as EodRouter };