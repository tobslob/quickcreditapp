import request from 'supertest';
import chai from 'chai';
import app from '../app';

const { expect } = chai;

let token1;
let token2;
let token3;

describe('Loan Route', () => {
  it('should signin user and generate token1', (done) => {
    request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'admin@quickcreditapp.herokuapp.com',
        password: 'Kazeem27',
      })
      .end((err, res) => {
        const { body } = res;
        token1 = body.token;
        done();
      });
  });
  it('should signin user and generate token2', (done) => {
    request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'tobi4real2050@gmail.com',
        password: 'Kazeem27',
      })
      .end((err, res) => {
        const { body } = res;
        token2 = body.token;
        done();
      });
  });
  it('should signin user and generate token3', (done) => {
    request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'newuser@gmail.com',
        password: 'Kazeem27',
      })
      .end((err, res) => {
        const { body } = res;
        token3 = body.token;
        done();
      });
  });
  it('should not post a user loan successfully, tenor should be between 1 - 12', (done) => {
    request(app)
      .post('/api/v1/loans')
      .set('token', token2)
      .send({ amount: 2000.567, tenor: 13 })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(422);
        expect(body).to.have.property('error');
        done();
      });
  });
  it('should not post a user loan if user status is pending or unverified', (done) => {
    request(app)
      .post('/api/v1/loans')
      .set('token', token3)
      .send({ amount: 2000.567, tenor: 3 })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(400);
        expect(body).to.have.property('error');
        expect(body.error).to.be.equal('wait for verification and re-apply for loan');
        done();
      });
  });
  it('should not post a user loan successfully if user have a pending loan', (done) => {
    request(app)
      .post('/api/v1/loans')
      .set('token', token1)
      .send({ amount: 2000.567, tenor: 3 })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(402);
        expect(body).to.have.property('error');
        expect(body.error).to.be.equal('you have an outstanding loan');
        done();
      });
  });
  it('should retrieve a loan repayment history successfully', (done) => {
    request(app)
      .get('/api/v1/loans/3/repayment')
      .set('token', token1)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(200);
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('repaid');
        done();
      });
  });
  it('should not retrieve a loan repayment history', (done) => {
    request(app)
      .get('/api/v1/loans/10/repayment')
      .set('token', token1)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(404);
        expect(body).to.have.property('error');
        expect(body.error).to.be.equal('loan not found');
        done();
      });
  });
  it('should not retrieve a loan repayment history if not posted by user', (done) => {
    request(app)
      .get('/api/v1/loans/1/repayment')
      .set('token', token1)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equal(400);
        expect(body).to.have.property('error');
        expect(body.error).to.be.equal('hmmm...you do not have access');
        done();
      });
  });
});
