import express, {Request, Response, NextFunction} from 'express';
import { currentUser } from '@nasddatax/common';
import { db } from '../models/mysql';

const router = express.Router();


router.put('/api/brokers/member/:id', currentUser, (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id)
  const { member_name, member_code, registration_type, registered_Address,rc_number,website,date_of_incorporation ,  phone,sec_registered,p_contact_name,p_contact_phone,p_contact_email,enq_contact_name, enq_contact_phone,enq_email_com, c_contact_name, c_contact_phone,c_contact_email } = req.body;
 
  let sql =
    "UPDATE `dealing_member` SET `member_name` = ?, member_code=?, registration_type=?, registered_Address=?, rc_number=? , website=? , date_of_incorporation=?, phone=? , sec_registered=? , p_contact_name=?, p_contact_phone=? , p_contact_email=?, enq_contact_name=?, enq_contact_phone=?, enq_email_com=?, c_contact_name=?, c_contact_phone=?, c_contact_email=? WHERE `dealing_member`.`sn` =? ";
  let query = db.query(sql,[member_name,member_code,registration_type, registered_Address, rc_number, website,  date_of_incorporation, phone, sec_registered, p_contact_name, p_contact_phone,p_contact_email, enq_contact_name, enq_contact_phone, enq_email_com,c_contact_name, c_contact_phone,c_contact_email, id],  (err, results) => {
    if (err || !results) {
      
      return res.status(400).json({
         
        error: "not found"
        
      });
    } else {
    
      return res.json(results);
    }
  
  });

})

export { router as DealingMemberUpdateRouter };