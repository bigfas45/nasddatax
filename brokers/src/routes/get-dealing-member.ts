import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { db } from '../models/mysql';

const router = express.Router();


router.get('/api/brokers/member/:id', currentUser, (req: Request, res: Response) => {
  const { id } = req.params;
 
 
  let sql =
    "SELECT * FROM `dealing_member` WHERE sn=? LIMIT 1 ";
  let query = db.query(sql,[id],  (err, results) => {
    if (err || !results) {
      
      return res.status(400).json({
         
        error: "not found"
        
      });
    } else {
//@ts-ignore
      results.forEach(element => {
         return res.json(element);
      });
    
     
    }
  
  });

})

export { router as DealingMemberGetRouter };