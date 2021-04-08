import express, { Response, Request } from 'express';
import { User } from '../models/users';
import { body } from 'express-validator';
import { NotFoundError } from '@nasddatax/common';

const router = express.Router();

router.put(
  '/api/brokers/connect/:userid',

  async (req: Request, res: Response) => {
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
    const userId = req.params.userid;
    const user = await User.findOne({email: userId});

    if (!user) {
      throw new NotFoundError();
    }
    if (name) {
      user.set({ name });
    }
    if (dob) {
      user.set({ dob });
    }
    if (telephone) {
      user.set({ telephone });
    }
    if (email) {
      user.set({ email });
    }
    if (gender) {
      user.set({ gender });
    }
    if (certificate) {
      user.set({ certificate });
    }
    if (IELTS) {
      user.set({ IELTS });
    }
    if (Nurse) {
      user.set({ Nurse });
    }
    if (NMC) {
      user.set({ NMC });
    }
    if (CBT) {
      user.set({ CBT });
    }
    if (Nurse) {
      user.set({ Nurse });
    }
    if (discipline) {
      user.set({ discipline });
    }
    if (experience) {
      user.set({ experience });
    }
    if (workingNurse) {
      user.set({ workingNurse });
    }
    if (department) {
      user.set({ department });
    }
    if (relation) {
      user.set({ relation });
    }

   

    if (notice) {
      user.set({ notice });
    }

    await user.save();

    res.send(user);
    
  }
);

export { router as UserUpdateRouter };
