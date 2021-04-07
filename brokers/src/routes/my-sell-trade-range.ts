import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { db } from '../models/mysql';
var moment = require('moment');

const router = express.Router();


router.get('/api/brokers/range/sell/:year1/:year2/:code', currentUser, (req: Request, res: Response) => {
  const { code, year1, year2 } = req.params
  console.log(year1);
 let sql =
    "SELECT data.`FROM MEMBER` as frommember, `TRADE DATE` as date,(`TOTAL VALUE`/10000) as value,(`VOLUME`),dealing_member.member_name,(`PRICE`/10000) as price,`TRADE DATE` as date,`SYMBOL`,`TO ACCOUNT`, `FROM ACCOUNT` as fromaccount, `TO MEMBER` as tomember  FROM data INNER JOIN dealing_member ON data.`FROM MEMBER`= dealing_member.member_code WHERE `TRADE DATE`  BETWEEN ? AND ? AND  `FROM MEMBER` =?  ORDER BY `data`.`VOLUME` ASC";
  let query = db.query(sql, [year1,year2, code], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: "not found"
      });
    } else {
      return res.json(results);
    }
  });

})

export { router as MySellRangeRouter };