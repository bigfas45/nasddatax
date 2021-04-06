import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';

const router = express.Router();


router.get('/api/equity/value', currentUser, (req: Request, res: Response) => {
  var d = new Date();
var year = d.getFullYear(); 
 
   let sql = "SELECT `SYMBOL`,SUM(`VOLUME`)AS Volume, SUM(`VALUE`)AS Value FROM `market_activity_sheet` WHERE Year(DATE) =? GROUP BY `SYMBOL` ORDER BY Value DESC LIMIT 5";
    let query = db.query(sql,[year], (err, results) => {
        if (err || !results) {
            return res.status(400).json({
                error: 'usi not found'
            });
        }else{
            // @ts-ignore
      
         return res.json(results);
    
        }
    });

})

export { router as TopTradeValueRouter };