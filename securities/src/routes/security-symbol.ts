import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import {db } from '../models/mysql';

const router = express.Router();


router.get('/api/securities/symbol', currentUser, (req: Request, res: Response) => {

  let sql =
    'SELECT `COL 11` as symbol,  `COL 3` as securityName  FROM security_to_traded';
  let query = db.query(sql, (err, results) => {
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

export { router as SymbolRouter };