import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser,  (req, res) => {
 
  res.send({ currentUser: req.currentUser || null });


});


export { router as currentUserRouter };