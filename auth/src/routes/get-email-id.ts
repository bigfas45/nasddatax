import express, { Request, Response } from 'express';
import { currentUser, NotFoundError } from '@nasddatax/common';
import { Email } from '../models/email';

const router = express.Router();

router.get('/api/users/email/:emailId', async (req: Request, res: Response) => {
  const { emailId } = req.params;

  const email = await Email.findById(emailId);

  if (!email) {
    throw new NotFoundError();
  }

  res.send(email);
});

export { router as EmailGetRouter };
