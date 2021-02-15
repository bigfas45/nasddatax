import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { db } from '../models/mysql';
var moment = require('moment');


const router = express.Router();


router.get('/api/brokers/top10/:date1/:date2', currentUser, (req: Request, res: Response) => {
  const { date1, date2 } = req.params
   let sql =
    "SELECT data.`TO MEMBER` toMember,COUNT(*) count ,SUM(`TOTAL VALUE`/10000) AS y,SUM(`VOLUME`) as volume ,dealing_member.member_name  FROM data INNER JOIN dealing_member ON data.`TO MEMBER`= dealing_member.member_code WHERE `TRADE DATE` BETWEEN ? AND ? GROUP BY data.`TO MEMBER` ORDER BY y DESC";
  let query = db.query(sql, [date1, date2], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: "not found"
      });
    } else {
      return res.json(results);
    }
  });

})

export { router as Top10Router };