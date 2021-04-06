import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';

const router = express.Router();


router.get('/api/equity/date', currentUser, (req: Request, res: Response) => {

   let sql = "SELECT DISTINCT Date FROM general_market_summary ORDER BY Date DESC LIMIT 1";
    let query = db.query(sql, (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'usi not found'
            });
        }else{
            // @ts-ignore
        results.forEach(element => {
         return res.json(element);
      });
        }
    });

})

export { router as DateRouter };