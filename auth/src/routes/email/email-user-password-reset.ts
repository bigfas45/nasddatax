// require on top
import express, { Request, Response, NextFunction } from 'express';
import { User } from '../../models/users';
import { NotFoundError } from '@nasddatax/common';

const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID);

export const emailPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const { emailId } = req.params;

     const user = await User.findOne({email: emailId});

    if (!user) {
      throw new NotFoundError();
    }

    // const password = Math.random().toString(36).slice(2);
    // console.log(password);

    const password = "olutypsgg";
    
//   req.session = {
//       password: password
//     };
    
    


  const emailData = {
    from: 'marketoperations@nasdng.com',
    to: `${emailId}`,
    cc: 'marketreports@nasdng.com',
    subject: `NASD DATA PORTAL PASSWORD RESET`,
    html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0 auto !important;padding: 0 !important;font-size: 14px;margin-bottom: 10px;line-height: 24px;color: #8094ae;font-weight: 400;height: 100% !important;width: 100% !important;font-family: 'Roboto', sans-serif !important;">
<head style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">
    <meta charset="utf-8" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">
    <meta name="viewport" content="width=device-width" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">
    <meta name="x-apple-disable-message-reformatting" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">
    <title style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;"></title>
    
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,600" rel="stylesheet" type="text/css" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">
    
</head>

<body width="100%" style="margin: 0 auto !important;padding: 0 !important;mso-line-height-rule: exactly;background-color: #f5f6fa;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-size: 14px;margin-bottom: 10px;line-height: 24px;color: #8094ae;font-weight: 400;height: 100% !important;width: 100% !important;font-family: 'Roboto', sans-serif !important;">
	<center style="width: 100%;background-color: #f5f6fa;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f5f6fa" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0 auto !important;padding: 0;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;">
            <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">
               <td style="padding: 40px 0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                    <table style="width: 100%;max-width: 620px;margin: 0 auto;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;padding: 0;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;">
                        <tbody style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">
                            <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">
                                <td style="text-align: center;padding-bottom: 25px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                    <a href="#" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;text-decoration: none;"><img style="height: 40px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;-ms-interpolation-mode: bicubic;" src="https://nasdng.com/wp-content/uploads/2018/10/NASD-LOGO-PLC.png" alt="logo"></a>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table style="width: 100%;max-width: 620px;margin: 0 auto;background-color: #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;padding: 0;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;">
                        <tbody style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">
                            <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">
                                <td style="padding: 30px 30px 15px 30px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                    <h2 style="font-size: 18px;color: red;font-weight: 600;margin: 0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;padding: 0;">NASD DATA PORTAL PASSWORD RESET
</h2>
                                </td>
                            </tr>
                            <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">
                                <td style="padding: 0 30px 20px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                    <p style="margin-bottom: 10px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">Dear sir,</p>
                                    <p style="margin-bottom: 10px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">Your account password has been successfully reset on NASD Data Portal System.</p>
                                    <p style="margin-bottom: 10px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">Please find below details for your account.</p>
                                    
                                    <p style="color: black;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;"><b style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">PORTAL LINK : <a href="https://www.nasddatax.com/" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;text-decoration: none;">https://www.nasddatax.com/</a> </b></p>

                                     <p style="color: black;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;"><b style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;"> EMAIL :  ${emailId} </b></p>

                                      <p style="color: black;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;"><b style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;"> PASSWORD :  ${password} </b></p>

                                </td>
                            </tr>
                           
                            <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">
                                <td style="padding: 20px 30px 40px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                    <p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">If you did not make this request, please contact us or ignore this message.</p>
                                    <p style="margin: 0;font-size: 13px;line-height: 22px;color: #9ea8bb;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;padding: 0;">This is an automatically generated email please do not reply to this email. If you face any issues, please contact us at  marketoperations@nasdng.com</p>


                                     <br style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;"><br style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">
                                     <p style="margin: 0;font-size: 13px;line-height: 22px;color: #9ea8bb;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;padding: 0;">Thank you for using NASD Trading Platform</p>

                                    <img style="margin: 30px 0px 0px -30px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;padding: 0;-ms-interpolation-mode: bicubic;" src="http://nasdotcng.com/crowdsite/images/signature.png">
                                </td>



                            </tr>

                        </tbody>

                    </table>

                
               </td>
            </tr>
        </table>
    </center>
</body>
</html> 
`
  };
  // @ts-ignore
 sgMail.send(emailData).then((sent) => console.log('SENT 2 >>>')).catch((err) => console.log('ERR 2 >>>', err));

  next();
};
