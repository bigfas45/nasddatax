import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
const RequestIp = require('@supercharge/request-ip')

import {Password} from '../services/password'
import { BadRequestError, validateRequest } from '@nasddatax/common';
import { User } from '../models/users';
import { LoginActivities } from '../models/login-activities';
const router = express.Router();

router.post('/api/users/signin', [
   body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
],validateRequest,
async  (req:Request, res:Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }

  const passwordsMatch = await Password.compare(existingUser.password, password);

  if (!passwordsMatch) {
    throw new BadRequestError('invalid credentials');
  }

  const ip = RequestIp.getClientIp(req);
  const broswer = req.headers['user-agent'];
 




  // Login activiies 
    var d = new Date();
    const LoginTime = LoginActivities.build({ userId: existingUser.id, date: d, ip, broswer });
  await LoginTime.save();
  
  console.log(LoginTime);




  
    // Generate JWT

    const userJwt = jwt.sign({
      id: existingUser.id,
      email: existingUser.email,
      bCode: existingUser.bCode,
      firstname: existingUser.firstname,
      lastname: existingUser.lastname,
      userType: existingUser.userType,
      status: existingUser.status,
    }, process.env.JWT_KEY!);


    // Store it on session object
  req.session = {
      jwt: userJwt
  };
  
  res.status(200).send(existingUser);
});


export { router as signinRouter };