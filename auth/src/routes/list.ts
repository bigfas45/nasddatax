import express, { Request, Response, Router } from 'express';
import {
  currentUser,
  requireAuth,
  
  NotFoundError
} from '@nasddatax/common';
import { User } from '../models/users';

const router = express.Router();

router.get(
  '/api/users',
  currentUser,
 requireAuth,
 
 async (req: Request, res: Response) => {
    const user = await User.find({});

    if (!user) {
      throw new NotFoundError();
    }

    res.status(200).send(user);
  }
);

export { router as ListUserRouter };
