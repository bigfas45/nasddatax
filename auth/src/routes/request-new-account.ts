import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import {validateRequest, BadRequestError, PremiumStatus} from '@nasddatax/common'
import { email } from './email/email-user-loging-details';



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
    body('bCode')
      .not()
      .isEmpty()
      .withMessage('bCode is required'),

],
  validateRequest,email,
  async (req: Request, res: Response) => {
    
    
    

    const { email, bCode, firstname, lastname } = req.body;


 

   



 


  



 

    res.status(201).send("Request Sent ");
    
  


});


export { router as signupRouter };