import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { body } from 'express-validator';
import {validateRequest, BadRequestError, NotFoundError} from '@nasddatax/common'
import formidable from 'formidable';
import _ from 'lodash';
import fs from 'fs';
import { Reports } from '../models/reports';



const router = express.Router();

router.get('/api/securities/report/list', currentUser,async (req: Request, res: Response) => {
 
 
  const report = await Reports.find({});

  if (!report) {
    throw new NotFoundError();
  }

  res.status(200).send(report);
}
);


export { router as ReportListRouter };