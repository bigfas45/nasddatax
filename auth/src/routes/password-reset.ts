import express, { Response, Request } from 'express';
import { User } from '../models/users';
import { NotFoundError } from '@nasddatax/common';
import {emailPassword} from './email/email-user-password-reset'

const router = express.Router();

router.put(
  '/api/users/password-reset/:emailId', emailPassword,
  async (req: Request, res: Response) => {
    const { emailId } = req.params;
    const user = await User.findOne({email: emailId});

    if (!user) {
      throw new NotFoundError();
    }

    const password = 'olutypsgg';

    if (password) {
     
      user.set({ password });
    }
 
    await user.save();

    res.send(user);
  }
);

export { router as UserEmailGetRouter };
