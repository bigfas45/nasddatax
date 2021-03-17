import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { body } from 'express-validator';
import {validateRequest, BadRequestError} from '@nasddatax/common'
import formidable from 'formidable';
import _ from 'lodash';
import fs from 'fs';
import { Reports } from '../models/reports';
import {emailPi} from './email/email'



const router = express.Router();

router.post('/api/securities/reports/create' , currentUser, emailPi, (req: Request, res: Response) => {
  

 
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'File could not be uploaded' });
    }
    // check for all fields
    const { security, year, filename } = fields;


    if (!security || !year || !filename) {
      return res.status(400).json({
        error: ' All fields are required ',
      });
    }

    let report = new Reports(fields);
    if (files.file) {
      // console.log('FILES PHOTO', files.file);
      // @ts-ignore
      report.file.data = fs.readFileSync(files.file.path, 'utf8');
       // @ts-ignore
      report.file.contentType = files.file.type;
       // @ts-ignore
      report.file.path = files.file.path;
       // @ts-ignore
      report.file.name = files.file.name;
    } else {
      return res.status(400).json({
        error: ' File fields are required ',
      });
    }

    report.save((err, result) => {
      if (err) {
        return res.status(400).json( "something went wrong");
      }
      res.json(result);

    });
  });


});


export { router as ReportsRouter };