import request from 'supertest';
import chai from 'chai';
import faker from 'faker';
import app from '../app';

const { expect } = chai;

let Token;
let Token1;
let adminToken;
let adminToken1;
let mail;
// let loanId;
let userid;

describe('Admin Route', () => {
  it('should login user successfully and generate admin token', (done) => {
    request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'kaztech2016@gmail.com', password: 'Kazeem27' })
      .end((err, res) => {
        const { body } = res;
        adminToken = body.token;
        done();
      });
  });
  it('should login user successfully and generate admin token', (done) => {
    request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'kazmobileapp@gmail.com', password: 'Kazeem27' })
      .end((err, res) => {
        const { body } = res;
        Token = body.token;
        done();
      });
  });
  it('should verified a user successfully', (done) => {
    request(app)
      .patch('/api/v1/users/kazmobileapp@gmail.com/verify')
      .set('token', adminToken)
      .send({ status: 'verified' })
      .then((res) => {
        expect(res.status).to.be.equal(202);
        expect(res.body).to.have.property('data').which.haveOwnProperty('status');
        done();
      })
      .catch(error => done(error));
  });
  it('should not verified a user if not admin token', (done) => {
    request(app)
      .patch('/api/v1/users/kazmobileapp@gmail.com/verify')
      .set('token', Token)
      .send({ status: 'verified' })
      .then((res) => {
        expect(res.status).to.be.equal(403);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Unauthorized!, Admin only route');
        done();
      })
      .catch(error => done(error));
  });
  it('should not verified a user if no admin token', (done) => {
    request(app)
      .patch('/api/v1/users/kazmobileapp@gmail.com/verify')
      .send({ status: 'verified' })
      .then((res) => {
        expect(res.status).to.be.equal(403);
        expect(res.body).to.have.property('error');
        done();
      })
      .catch(error => done(error));
  });
  it('should not verified a user if not present in database', (done) => {
    request(app)
      .patch('/api/v1/users/kazmobileap@gmail.com/verify')
      .set('token', adminToken)
      .send({ status: 'verified' })
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.equal('user not exist');
        done();
      })
      .catch(error => done(error));
  });
  it('should not verified a user successfully with wrong status input', (done) => {
    request(app)
      .patch('/api/v1/users/kazmobileapp@gmail.com/verify')
      .set('token', adminToken)
      .send({ status: 'verify' })
      .then((res) => {
        expect(res.status).to.be.equal(422);
        expect(res.body).to.have.property('error');
        done();
      })
      .catch(error => done(error));
  });
  it('should get all loan application successfully', (done) => {
    request(app)
      .get('/api/v1/loans')
      .set('token', adminToken)
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('rowCount');
        done();
      })
      .catch(error => done(error));
  });
  it('should not get all loan application if its a client token', (done) => {
    request(app)
      .get('/api/v1/loans')
      .set('token', Token)
      .then((res) => {
        expect(res.status).to.be.equal(403);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Unauthorized!, Admin only route');
        done();
      })
      .catch(error => done(error));
  });
  it('should get a specific loan application successfully', (done) => {
    request(app)
      .get('/api/v1/loans/2')
      .set('token', adminToken)
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('data');
        done();
      })
      .catch(error => done(error));
  });
  it('should not get a specific loan application if its a client', (done) => {
    request(app)
      .get('/api/v1/loans/2')
      .set('token', Token)
      .then((res) => {
        expect(res.status).to.be.equal(403);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Unauthorized!, Admin only route');
        done();
      })
      .catch(error => done(error));
  });
  it('should not get a specific loan application successfully', (done) => {
    request(app)
      .get('/api/v1/loans/9')
      .set('token', adminToken)
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Not Found');
        done();
      })
      .catch(error => done(error));
  });
  it('should view current loans (not fully repaid). successfully', (done) => {
    request(app)
      .get('/api/v1/loans?status=approved&repaid=false')
      .set('token', adminToken)
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('data');
        done();
      })
      .catch(error => done(error));
  });
  it('should not view current loans (not fully repaid). if its client', (done) => {
    request(app)
      .get('/api/v1/loans?status=approved&repaid=false')
      .set('token', Token)
      .then((res) => {
        expect(res.status).to.be.equal(403);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Unauthorized!, Admin only route');
        done();
      })
      .catch(error => done(error));
  });
  it('should view all paid loans successfully', (done) => {
    request(app)
      .get('/api/v1/loans?status=approved&repaid=true')
      .set('token', adminToken)
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('data');
        done();
      })
      .catch(error => done(error));
  });
  it('should not view all repaid. if its client', (done) => {
    request(app)
      .get('/api/v1/loans?status=approved&repaid=true')
      .set('token', Token)
      .then((res) => {
        expect(res.status).to.be.equal(403);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Unauthorized!, Admin only route');
        done();
      })
      .catch(error => done(error));
  });
  it('should not view current loans (not fully repaid). successfully', (done) => {
    request(app)
      .get('/api/v1/loans?status=approv&repaid=false')
      .set('token', adminToken)
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.equal('Not Found');
        done();
      })
      .catch(error => done(error));
  });
  it('should approve or reject a loan successfully', (done) => {
    request(app)
      .patch('/api/v1/loans/2')
      .set('token', adminToken)
      .send({ status: 'reject' })
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('data');
        done();
      })
      .catch(error => done(error));
  });
  it('should not approve or reject a loan  if its client', (done) => {
    request(app)
      .patch('/api/v1/loans/1')
      .set('token', Token)
      .send({ status: 'reject' })
      .then((res) => {
        expect(res.status).to.be.equal(403);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Unauthorized!, Admin only route');
        done();
      })
      .catch(error => done(error));
  });
  it('should not approve or reject a loan  if not present', (done) => {
    request(app)
      .patch('/api/v1/loans/10')
      .set('token', adminToken)
      .send({ status: 'reject' })
      .then((res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.have.property('error');
        done();
      })
      .catch(error => done(error));
  });
  it('should not approve or reject a loan with wrong input', (done) => {
    request(app)
      .patch('/api/v1/loans/2')
      .set('token', adminToken)
      .send({ status: 'rejected' })
      .then((res) => {
        expect(res.status).to.be.equal(422);
        expect(res.body).to.have.property('error');
        done();
      })
      .catch(error => done(error));
  });
  it('should successfully post loan repayment for a client', (done) => {
    request(app)
      .post('/api/v1/loans/1/repayment')
      .set('token', adminToken)
      .send({ paidAmount: 3000 })
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('data');
        done();
      })
      .catch(error => done(error));
  });
  it('should not post loan repayment for a client', (done) => {
    request(app)
      .post('/api/v1/loans/4/repayment')
      .set('token', adminToken)
      .send({ })
      .then((res) => {
        expect(res.status).to.be.equal(422);
        expect(res.body).to.have.property('error');
        done();
      })
      .catch(error => done(error));
  });
  it('should not post loan repayment for a client', (done) => {
    request(app)
      .post('/api/v1/loans/2/repayment')
      .set('token', adminToken)
      .send({ paidAmount: 500000 })
      .then((res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.equal('you can not pay more than your debt!');
        done();
      });
  });
  it('should not post loan repayment for a client', (done) => {
    request(app)
      .post('/api/v1/loans/4/repayment')
      .set('token', adminToken)
      .send({ paidAmount: 3000 })
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property('message');
        done();
      })
      .catch(error => done(error));
  });
});


// tdd admin route version two ( v2)

describe('Admin Route version two (v2)', () => {
  it('should login admin successfully and generate admin token', (done) => {
    request(app)
      .post('/api/v2/auth/signin')
      .send({ email: 'admin@quickcreditapp.com', password: 'Kazeem27' })
      .end((err, res) => {
        const { body } = res;
        adminToken1 = body.data[0].token;
        done();
      });
  });
  it('should login user successfully and generate user token', (done) => {
    request(app)
      .post('/api/v2/auth/signin')
      .send({ email: 'kazmobileapp@gmail.com', password: 'Kazeem27' })
      .end((err, res) => {
        const { body } = res;
        Token1 = body.data[0].token;
        done();
      });
  });
  it('should successfully signup a user with valid details', (done) => {
    request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: faker.internet.email(),
        firstName: 'tester',
        lastName: 'testing',
        password: 'Kazeem27',
        address: '27, tunji Olaiya street',
      })
      .end((err, res) => {
        const { body } = res;
        mail = body.data.email;
        userid = body.data.id;
        done();
      });
  });
  it('should verified a user successfully', (done) => {
    request(app)
      .patch(`/api/v2/users/${mail}/verify`)
      .set('token', adminToken1)
      .send({ status: 'verified' })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(200);
        expect(body).to.have.property('data');
        expect(body.data[0]).to.haveOwnProperty('message');
        expect(body.data[0].message).to.be.equal(`users with id:${userid} has been verified`);
        done();
      });
  });
  it('should not verified a user successfully if not found', (done) => {
    request(app)
      .patch('/api/v2/users/kazmobileap@gmail.com/verify')
      .set('token', adminToken1)
      .send({ status: 'verified' })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(404);
        expect(body).to.have.property('error');
        expect(body.error).to.be.equal('Not Found');
        done();
      });
  });
  it('should not authorize a user without a token', (done) => {
    request(app)
      .patch(`/api/v2/users/${mail}/verify`)
      .send({ status: 'verified' })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(403);
        expect(body).to.have.property('error');
        expect(body.error).to.be.equal('Unauthorized!, you have to login');
        done();
      });
  });
  it('should not authorize a user in admin route', (done) => {
    request(app)
      .patch(`/api/v2/users/${mail}/verify`)
      .set('token', Token1)
      .send({ status: 'verified' })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(403);
        expect(body).to.have.property('error');
        expect(body.error).to.be.equal('Unauthorized!, Admin only route');
        done();
      });
  });
  it('should not verified a user successfully with wrong input', (done) => {
    request(app)
      .patch(`/api/v2/users/${mail}/verify`)
      .set('token', adminToken1)
      .send({ status: 'verify' })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(422);
        expect(body).to.have.property('error');
        done();
      });
  });
  it('should post a user loan successfully', (done) => {
    request(app)
      .post('/api/v2/loans')
      .set('token', Token1)
      .send({ amount: 2000.567, tenor: 2 })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.a('number');
        done();
      });
  });
  it('should get all loan application successfully', (done) => {
    request(app)
      .get('/api/v2/loans')
      .set('token', adminToken1)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(200);
        expect(body).to.have.property('data');
        expect(body.data[0]).to.haveOwnProperty('message');
        expect(body.data[0].message).to.be.equal('loans retrieve successfully');
        done();
      });
  });
  it('should get a specific loan application successfully', (done) => {
    request(app)
      .get('/api/v2/loans/1')
      .set('token', adminToken1)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(200);
        expect(body).to.have.property('data');
        expect(body.data[0]).to.haveOwnProperty('message');
        done();
      });
  });
  it('should not get a specific loan application successfully', (done) => {
    request(app)
      .get('/api/v2/loans/678954')
      .set('token', adminToken1)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(404);
        expect(body).to.have.property('error');
        done();
      });
  });
  it('should view current loans (not fully repaid). successfully', (done) => {
    request(app)
      .get('/api/v2/loans?status=approved&repaid=false')
      .set('token', adminToken1)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.equal(200);
        expect(body.status).to.be.equal(200);
        expect(body.status).to.be.a('number');
        done();
      });
  });
  it('should view all paid loans successfully', (done) => {
    request(app)
      .get('/api/v2/loans?status=approved&repaid=true')
      .set('token', adminToken1)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.equal(200);
        expect(body.status).to.be.equal(200);
        expect(body.status).to.be.a('number');
        done();
      });
  });
  it('should not approve or reject a loan without correct input', (done) => {
    request(app)
      .patch('/api/v2/loans/1')
      .set('token', adminToken1)
      .send({ status: 'rejected' })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(422);
        expect(body).to.have.property('error');
        done();
      });
  });
  it('should approve or reject a loan  successfully', (done) => {
    request(app)
      .patch('/api/v2/loans/1')
      .set('token', adminToken1)
      .send({ status: 'approved' })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(200);
        expect(body).to.have.property('data');
        expect(body.data[0]).to.haveOwnProperty('message');
        done();
      });
  });
  it('should successfully post loan repayment for a client', (done) => {
    request(app)
      .post('/api/v2/loans/1/repayment')
      .send({ paidAmount: 500 })
      .set('token', adminToken1)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(201);
        expect(body).to.have.property('data');
        done();
      });
  });
  it('should not post loan repayment for a client if repayment is more than loan', (done) => {
    request(app)
      .post('/api/v2/loans/1/repayment')
      .send({ paidAmount: 400000 })
      .set('token', adminToken1)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(400);
        expect(body).to.have.property('error');
        expect(body.error).to.be.equal('You can not pay more than your debt!');
        done();
      });
  });
  it('should not post loan repayment for a client', (done) => {
    request(app)
      .post('/api/v2/loans/1/repayment')
      .send({ })
      .set('token', adminToken1)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(422);
        expect(body).to.have.property('error');
        done();
      });
  });
  it('should not post loan repayment for a client', (done) => {
    request(app)
      .post('/api/v2/loans/2000/repayment')
      .send({ paidAmount: 1000 })
      .set('token', adminToken1)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(404);
        expect(body).to.have.property('error');
        expect(body.error).to.be.equal('No such loan found');
        done();
      });
  });
  it('should delete a user successfully', (done) => {
    request(app)
      .delete(`/api/v2/auth/user/${userid}`)
      .set('token', adminToken1)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(200);
        done();
      });
  });
});
