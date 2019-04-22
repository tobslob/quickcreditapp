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
});