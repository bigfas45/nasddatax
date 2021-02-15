import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { db } from '../models/mysql';
var moment = require('moment');

const router = express.Router();


router.get('/api/brokers/sell', currentUser, (req: Request, res: Response) => {

      var startYearDay = new Date(new Date().getFullYear(), 0, 1);
  var momentDate1 = moment(startYearDay);
  var start = momentDate1.format("YYYY");
  let sql =
    "SELECT dealing_member.`member_name` as from_member_name,dealing_member.`member_code` ,data1.`FROM MEMBER`,COUNT(*) fromCount, SUM(data1.`TOTAL VALUE`/10000) as fromValue, SUM(data1.`VOLUME`) as fromVolume FROM data as data1 INNER JOIN dealing_member ON data1.`FROM MEMBER`= dealing_member.member_code WHERE data1.`TRADE DATE` >= ? GROUP BY data1.`FROM MEMBER` ";
  let query = db.query(sql, [start], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: "not found"
      });
    } else {
      return res.json(results);
    }
  });

})

export { router as BrokersSellRouter };