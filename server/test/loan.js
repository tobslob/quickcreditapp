import request from 'supertest';
import chai from 'chai';
import app from '../app';

const { expect } = chai;

describe('Loan Route', () => {
  it('should post a user loan successfully', (done) => {
    request(app)
      .post('/api/v1/loans')
      .send({ amount: 2000.567, tenor: 3 })
      .then((res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body).to.have.property('data');
        done();
      })
      .catch(error => done(error));
  });
  it('should not post a user loan successfully', (done) => {
    request(app)
      .post('/api/v1/loans')
      .send({ amount: 2000.567, tenor: 13 })
      .then((res) => {
        expect(res.status).to.be.equal(422);
        expect(res.body).to.have.property('error');
        done();
      })
      .catch(error => done(error));
  });
  it('should not post a user loan successfully', (done) => {
    request(app)
      .post('/api/v1/loans')
      .send({ amount: 2000.567, tenor: 3 })
      .then((res) => {
        expect(res.status).to.be.equal(402);
        expect(res.body).to.have.property('message');
        done();
      })
      .catch(error => done(error));
  });
  it('should retrieve a loan repayment history successfully', (done) => {
    request(app)
      .get('/api/v1/loans/3e66de26-5bbb-430b-9458-f35fc2a06819/repayment')
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('data');
        done();
      })
      .catch(error => done(error));
  });
  it('should not retrieve a loan repayment history', (done) => {
    request(app)
      .get('/api/v1/loans/3e66de26-5bbb-430b-9458-f35fc2a06839/repayment')
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property('message');
        done();
      })
      .catch(error => done(error));
  });
});
