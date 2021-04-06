import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';


const router = express.Router();


router.get('/api/equity/orders', currentUser, (req: Request, res: Response) => {

  const request = require('request');
  //@ts-ignore
request('http://38.17.52.42/ATS/Dealing/marketdataord.aspx', function (error, response, body) {
  // console.error('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
   const data = JSON.parse(body)
  res.send(data);

});
 
})

export { router as OrdersRouter };