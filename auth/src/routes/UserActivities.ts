import express, { Request, Response } from 'express';
import { currentUser, NotFoundError } from '@nasddatax/common';
import { LoginActivities } from '../models/login-activities';

const router = express.Router();

router.get('/api/users/activities/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await LoginActivities.find({userId});

  if (!user) {
    throw new NotFoundError();
  }

  res.send(user);
});

export { router as UserActivitiesRouter };
