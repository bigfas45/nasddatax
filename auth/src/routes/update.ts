import express, { Response, Request } from 'express';
import { User } from '../models/users';
import { body } from 'express-validator';
import { NotFoundError, requireAuth, currentUser } from '@nasddatax/common';
import { UserUpdatedPublisher} from '../events/publishers/user-updated-publisher';
import {natsWrapper} from '../nats-wrapper'

const router = express.Router();

router.put(
  '/api/users/:userid',
  currentUser,
  // requireAuth,

  async (req: Request, res: Response) => {
    const {
      email,
      bCode,
      firstname,
      lastname,
      userType,
      password,
      expiresAt,
      status
    
    } = req.body;
    const userId = req.params.userid;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError();
    }

    if (email) {
      user.set({ email });
    }

    if (password) {
      user.set({ password });
    }
    if (password) {
      user.set({ password });
    }
    if (firstname) {
      user.set({ firstname });
    }
    if (lastname) {
      user.set({ lastname });
    }
    if (bCode) {
      user.set({ bCode });
    }
    if (userType) {
      user.set({ userType });
    }
    if (expiresAt) {
      user.set({ expiresAt });
    }

      if (status) {
      user.set({ status });
    }
    

    await user.save();


    new UserUpdatedPublisher(natsWrapper.client).publish({
       id: user.id,
      email: user.email,
      bCode: user.bCode,
      firstname: user.firstname,
      lastname: user.lastname,
      userType: user.userType,
      password: user.password,
      expiresAt: user.expiresAt,
      status: user.status
    })

    res.send(user);
  }
);

export { router as UserUpdateRouter };
