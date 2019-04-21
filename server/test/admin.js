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
      .send({ status: 'verified' })
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('rowCount');
        done();
      })
      .catch(error => done(error));
  });
});
