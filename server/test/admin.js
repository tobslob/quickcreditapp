import request from 'supertest';
import chai from 'chai';
import app from '../app';

const { expect } = chai;

describe('Admin Route', () => {
  it('should verified a user successfully', (done) => {
    request(app)
      .patch('/api/v1/users/kazmobileapp@gmail.com/verify')
      .send({ status: 'verified' })
      .then((res) => {
        expect(res.status).to.be.equal(202);
        expect(res.body).to.have.property('data').which.haveOwnProperty('status');
        done();
      })
      .catch(error => done(error));
  });
  it('should not verified a user successfully', (done) => {
    request(app)
      .patch('/api/v1/users/kazmobileap@gmail.com/verify')
      .send({ status: 'verified' })
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property('message');
        done();
      })
      .catch(error => done(error));
  });
  it('should not verified a user successfully', (done) => {
    request(app)
      .patch('/api/v1/users/kazmobileapp@gmail.com/verify')
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
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('rowCount');
        done();
      })
      .catch(error => done(error));
  });
  it('should get a specific loan application successfully', (done) => {
    request(app)
      .get('/api/v1/loans/3e66de26-5bbb-430b-9458-f35fc2a06816')
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('data');
        done();
      })
      .catch(error => done(error));
  });
  it('should not get a specific loan application successfully', (done) => {
    request(app)
      .get('/api/v1/loans/3e66de26-5bbb-430b-9458-f35fc2a068r6')
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property('message');
        done();
      })
      .catch(error => done(error));
  });
  it('should view current loans (not fully repaid). successfully', (done) => {
    request(app)
      .get('/api/v1/loans?status=approved&repaid=false')
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('data');
        done();
      })
      .catch(error => done(error));
  });
  it('should view all paid loans successfully', (done) => {
    request(app)
      .get('/api/v1/loans?status=approved&repaid=true')
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('data');
        done();
      })
      .catch(error => done(error));
  });
  it('should approve or reject a loan  successfully', (done) => {
    request(app)
      .patch('/api/v1/loans/3e66de26-5bbb-430b-9458-f35fc2a06819')
      .send({ status: 'reject' })
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('data');
        done();
      })
      .catch(error => done(error));
  });
  it('should not approve or reject a loan', (done) => {
    request(app)
      .patch('/api/v1/loans/3e66de26-5bbb-430b-9458-f35fc2a06819')
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
      .post('/api/v1/loans/3e66de26-5bbb-430b-9458-f35fc2a06819/repayment')
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
      .post('/api/v1/loans/3e66de26-5bbb-430b-9458-f35fc2a16819/repayment')
      .send({ paidAmount: 3000 })
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property('message');
        done();
      })
      .catch(error => done(error));
  });
});
