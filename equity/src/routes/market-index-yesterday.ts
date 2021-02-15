import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';


const router = express.Router();


router.get('/api/equity/MarketIndexY', currentUser, (req: Request, res: Response) => {

 let sql = 'SELECT * FROM market_snapshot ORDER BY present_date DESC Limit 1,1 ';
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

export { router as MarketIndexYRouter };