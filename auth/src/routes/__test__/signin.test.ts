import request from 'supertest';
import { app } from '../../app';

it('fails when a email that does not exist is supplied', async () => {
  // await request(app)
  //   .post('/api/users/signin')
  //   .send({ email: 'dimeji@nasdng.com', password: 'ifeoluwass33' })
  //   .expect(400);
});


it('fails when an incorrect password is supplied', async () => {
//  await request(app)
//     .post('/api/users/signup')
//     .send({
//       email: "afasina@nasdng.com",
//       password: "Ifeoluwa2016",
//       firstname: "Ayodimeji",
//       lastname: "Fasina",
//       bCode: "4STB"
//     })
//     .expect(201);
  
//   await request(app)
//     .post('/api/users/signin')
//     .send({ email: 'afasina@nasdng.com', password: 'ifeoluwass33' })
//     .expect(400);

});
  


it('responds with a cookie when given valid credentials', async () => {
// await request(app)
//     .post('/api/users/signup')
//     .send({
//       email: "afasina@nasdng.com",
//       password: "Ifeoluwa2016",
//       firstname: "Ayodimeji",
//       lastname: "Fasina",
//       bCode: "4STB"
//     })
//     .expect(201);
  
    // await request(app)
    // .post('/api/users/signin')
    // .send({
    // email: "afasina@nasdng.com",
    //   password: "Ifeoluwa2016",
    // })
    // .expect(200);
  
    // expect(response.get('Set-Cookie')).toBeDefined();
  });