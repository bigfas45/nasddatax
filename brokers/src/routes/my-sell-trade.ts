import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { db } from '../models/mysql';
var moment = require('moment');

const router = express.Router();


router.get('/api/brokers/my/sell/:code', currentUser, (req: Request, res: Response) => {
  const { code } = req.params
  var startYearDay = new Date(new Date().getFullYear(), 0, 1);
  var momentDate1 = moment(startYearDay);
  var date = momentDate1.format("YYYY");
 let sql =
    "SELECT data.`FROM MEMBER` as frommember, `TRADE DATE` as date,(`TOTAL VALUE`/10000) as value,(`VOLUME`),dealing_member.member_name,(`PRICE`/10000) as price,`TRADE DATE` as date,`SYMBOL`,`TO ACCOUNT`, `FROM ACCOUNT` as fromaccount, `TO MEMBER` as tomember  FROM data INNER JOIN dealing_member ON data.`FROM MEMBER`= dealing_member.member_code WHERE `TRADE DATE` >= ? AND  `FROM MEMBER` =?  ORDER BY `data`.`VOLUME` ASC";
  let query = db.query(sql, [date, code], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: "not found"
      });
    } else {
      return res.json(results);
    }
  });

})

export { router as MySellRouter };