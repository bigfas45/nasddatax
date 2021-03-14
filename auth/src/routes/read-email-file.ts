import express, { Request, Response } from 'express';
import { currentUser, NotFoundError } from '@nasddatax/common';
import { Email } from '../models/email';

const router = express.Router();

router.get('/api/users/email/file/:emailId', async (req: Request, res: Response) => {
  const { emailId } = req.params;

  const email = await Email.findById(emailId);

  if (!email) {
    throw new NotFoundError();
  }

  // @ts-ignore
  const file = email.toJSON()
    // @ts-ignore
  if (file.file.data) {
       // @ts-ignore
    res.set('Content-Type', file.file.contentType);
      // @ts-ignore
    return res.send(file.file.data);
  }
    

 
});

export { router as EmailGetFileRouter };
