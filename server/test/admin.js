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
});
