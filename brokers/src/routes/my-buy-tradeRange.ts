import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { db } from '../models/mysql';
var moment = require('moment');

const router = express.Router();


router.get('/api/brokers/range/:year1/:year2/:code', currentUser, (req: Request, res: Response) => {
  const { code, year1, year2 } = req.params
  
 
  var startYearDay = new Date(new Date().getFullYear(), 0, 1);
  var momentDate1 = moment(startYearDay);
  var date = momentDate1.format("YYYY");
  
 let sql =
    " SELECT data.`TO MEMBER` as tomember ,(`TOTAL VALUE`/10000) as value ,(`VOLUME`),dealing_member.member_name,(`PRICE`/10000) as price,`TRADE DATE` as date,`SYMBOL`,`TO ACCOUNT` as toaccount,`FROM ACCOUNT`,`FROM MEMBER` as frommemebr FROM data INNER JOIN dealing_member ON data.`TO MEMBER`= dealing_member.member_code WHERE `TRADE DATE` BETWEEN ? AND ? AND `TO MEMBER` =? ORDER BY `data`.`VOLUME` ASC";
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

export { router as MyBuyRangeRouter };