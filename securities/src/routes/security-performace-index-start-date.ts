import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';

const router = express.Router();


router.get('/api/securities/performanceStart/:date', currentUser, (req: Request, res: Response) => {
const { date } = req.params
   let sql =
    'SELECT * FROM `market_snapshot` WHERE `present_date`=?';
  let query = db.query(sql,[date], (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    } else {
      return res.json(results);
    }
  });
db.destroy();
})

export { router as PerformanceStartRouter };