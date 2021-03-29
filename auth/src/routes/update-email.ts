import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { body } from 'express-validator';
import {validateRequest, BadRequestError, PremiumStatus} from '@nasddatax/common'
import formidable from 'formidable';
import _ from 'lodash';
import fs from 'fs';
import { Email } from '../models/email';



const router = express.Router();

router.put('/api/users/email/:emailId', currentUser, async (req: Request, res: Response) => {
  const { emailId } = req.params;
    const existingEmail = await Email.findById(emailId);

  if (!existingEmail) {
    throw new BadRequestError('Invalid credentials');
  }

    // res.status(200).send(existingEmail);
 
 let form = new formidable.IncomingForm();
  // form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'File could not be uploaded' });
    }

    // let mail = existingEmail;
   let mail = _.extend(existingEmail, fields);

    if (files.file) {
      // console.log('FILES PHOTO', files.file);
      // @ts-ignore
      mail.file.data = fs.readFileSync(files.file.path);
        // @ts-ignore
      mail.file.contentType = files.file.type;
        // @ts-ignore
      mail.file.path = files.file.path;
        // @ts-ignore
      mail.file.name = files.file.name;
    }
  // @ts-ignore
    mail.save((err, result) => {
      if (err) {
        return res.status(400).json("Something went wrong.");
      }
      res.json(result);
    });
  });

});


export { router as EmailUpdateRouter };