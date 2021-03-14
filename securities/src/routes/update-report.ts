import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { body } from 'express-validator';
import {validateRequest, BadRequestError} from '@nasddatax/common'
import formidable from 'formidable';
import _ from 'lodash';
import fs from 'fs';
import { Reports } from '../models/reports';



const router = express.Router();

router.put('/api/securities/reports/:reportId', currentUser, async (req: Request, res: Response) => {
  const { reportId } = req.params;
    const existingReport = await Reports.findById(reportId);

  if (!existingReport) {
    throw new BadRequestError('Invalid credentials');
  }

    // res.status(200).send(existingReport);
 
 let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'File could not be uploaded' });
    }

    // let report = existingReport;
   let report = _.extend(existingReport, fields);

    if (files.file) {
      // console.log('FILES PHOTO', files.file);
      // @ts-ignore
      report.file.data = fs.readFileSync(files.file.path);
        // @ts-ignore
      report.file.contentType = files.file.type;
        // @ts-ignore
      report.file.path = files.file.path;
        // @ts-ignore
      report.file.name = files.file.name;
    }
  // @ts-ignore
    report.save((err, result) => {
      if (err) {
        return res.status(400).json("Something went wrong.");
      }
      res.json(result);
    });
  });

});


export { router as reportUpdateRouter };