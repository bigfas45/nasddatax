import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import {validateRequest, BadRequestError, PremiumStatus} from '@nasddatax/common'
import { User } from '../models/users';
import { email } from './email/email-user-loging-details';
import { UserCreatedPublisher } from '../events/publishers/user-created-publisher';
import {natsWrapper} from '../nats-wrapper'


const router = express.Router();

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
   body('firstname')
      .not()
      .isEmpty()
      .withMessage('Firstname is required'),
    body('lastname')
      .not()
      .isEmpty()
    .withMessage('Lastname is required'),
   

],
  validateRequest,email,
  async (req: Request, res: Response) => {
    
    
    

    const { email, bCode, firstname, lastname } = req.body;


    const existingUser = await User.findOne({ email });

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + 1 * 60);

    if (existingUser) {
     
      throw new BadRequestError('Email in use');
    }



    const password = 'jutrrghd'

    console.log("password", password)

    const user = User.build({ email, password, bCode, firstname, lastname , expiresAt: expiration, status:PremiumStatus.FreePackage });
    await user.save();


   await new UserCreatedPublisher(natsWrapper.client).publish({
     id: user.id,
      email: user.email,
      bCode: user.bCode,
      firstname: user.firstname,
      lastname: user.lastname,
     userType: user.userType!,
     status: user.status,
     expiresAt: user.expiresAt

      
    })




 

    res.status(201).send(user);
    
  


});


export { router as signupRouter };