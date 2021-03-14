import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { body } from 'express-validator';
import {validateRequest, BadRequestError, PremiumStatus, NotFoundError} from '@nasddatax/common'
import formidable from 'formidable';
import _ from 'lodash';
import fs from 'fs';
import { Email } from '../models/email';



const router = express.Router();

router.get('/api/users/email/list', currentUser,async (req: Request, res: Response) => {
 
 
  const user = await Email.find({});

  if (!user) {
    throw new NotFoundError();
  }

  res.status(200).send(user);
}
);


export { router as EmailListRouter };