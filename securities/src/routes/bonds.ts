import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';


const router = express.Router();


router.get('/api/securities/bonds', currentUser, (req: Request, res: Response) => {

 let sql =
    'SELECT * FROM `bonds`';
  let query = db.query(sql, (err, results) => {
    if (err || !results) {
      return res.status(400).json({
        error: 'not found',
      });
    } else {
      return res.json(results);
    }
    
  });
 db.end();
 

})

export { router as BondsRouter };