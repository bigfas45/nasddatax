import express, { Request, Response, NextFunction } from 'express';
import { User } from '../models/users';
import { BadRequestError} from '@nasddatax/common'
import { email } from './email/email-user-loging-details';

const router = express.Router();

router.post('/api/brokers/connect', async (req: Request, res: Response) => {
  const {
    name,
    dob,
    telephone,
    email,
    gender,
    certificate,
    expiresAt,
    IELTS,
    Nurse,
    NMC,
    CBT,
    discipline,
    experience,
    workingNurse,
    department,
    relation,
    notice,
  } = req.body;




  const existingUser = await User.findOne({ email });
  
    if (existingUser) {
     
      throw new BadRequestError('Email in use');
    }
const user = User.build({name,
    dob,
    telephone,
    email,
    gender,
    certificate,
    expiresAt,
    IELTS,
    Nurse,
    NMC,
    CBT,
    discipline,
    experience,
    workingNurse,
    department,
    relation,
    notice });
  await user.save();
  
   res.status(201).send(user);

});

export { router as IndexConnectRouter };
