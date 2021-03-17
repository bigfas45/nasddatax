import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { body } from 'express-validator';
import {validateRequest, BadRequestError, PremiumStatus} from '@nasddatax/common'
import formidable from 'formidable';
import _ from 'lodash';
import fs from 'fs';
import { Email } from '../models/email';



const router = express.Router();

router.post('/api/users/email/create', currentUser,  (req: Request, res: Response) => {
 
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'File could not be uploaded' });
    }
    // check for all fields
    const { subject, message, file, link } = fields;

    if (!subject || !message ) {
      return res.status(400).json({
        error: ' All fields are required ',
      });
    }



    let mail = new Email(fields);
    if (files.file) {
      // console.log('FILES PHOTO', files.file);
      // @ts-ignore
      mail.file.data = fs.readFileSync(files.file.path, 'utf8');
       // @ts-ignore
      mail.file.contentType = files.file.type;
       // @ts-ignore
      mail.file.path = files.file.path;
       // @ts-ignore
      mail.file.name = files.file.name;
    } else {
      return res.status(400).json({
        error: ' Image fields are required ',
      });
    }

    mail.save((err, result) => {
      if (err) {
        return res.status(400).json( "something went wrong");
      }
      res.json(result);
    });
  });


});


export { router as EmailRouter };