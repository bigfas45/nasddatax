import mysql from 'mysql';

export const db = mysql.createConnection({
    host      : 'nasdotcng.com',
    user      : 'notcsadm_otc',
    password  :  'N#M3IM^stG0' ,
    database  :  'notcsadm_nplcsadm_nsd_new',
    multipleStatements: true
});
  


  
//  @ts-ignore
  db.connect((err) => {
    if (err) {
      db.destroy();
      throw err;
    } 
    console.log('Mysql 1 Connected ');
      db.destroy();
  });
