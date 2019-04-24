import chai from 'chai';
import request from 'supertest';
import app from '../app';

const { expect } = chai;

describe('User Route', () => {
  it('should successfully signup a user with valid details', (done) => {
    request(app)
      .post('/api/v1/auth/user/signup')
      .send({
        email: 'testingapp@gmail.com',
        firstName: 'tester',
        lastName: 'testing',
        password: 'Kazeem27',
        address: '27, tunji Olaiya street',
      })
      .then((res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('token');
        done();
      })
      .catch(err => done(err));
  });
  it('should not signup a user with invalid details', (done) => {
    request(app)
      .post('/api/v1/auth/user/signup')
      .send({
        email: 'testingapp',
        firstName: 'tester',
        lastName: 'testing',
        password: 'Kazeem27',
        address: '27, tunji Olaiya street',
      })
      .then((res) => {
        expect(res.status).to.be.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        done();
      })
      .catch(err => done(err));
  });
  it('should not signup a user with already exist email', (done) => {
    request(app)
      .post('/api/v1/auth/user/signup')
      .send({
        email: 'testingapp@gmail.com',
        firstName: 'tester',
        lastName: 'testing',
        password: 'Kazeem27',
        address: '27, tunji Olaiya street',
      })
      .then((res) => {
        expect(res.status).to.be.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        done();
      })
      .catch(err => done(err));
  });
  it('should login user successfully', (done) => {
    request(app)
      .post('/api/v1/auth/user/signin')
      .send({ email: 'kazmobileapp@gmail.com', password: 'Kazeem27' })
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('token');
        done();
      })
      .catch(error => done(error));
  });
  it('should not login user with invalid data', (done) => {
    request(app)
      .post('/api/v1/auth/user/signin')
      .send({ email: 'kazmobileapp@gmail.com', password: 'razeem27' })
      .then((res) => {
        expect(res.status).to.be.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        done();
      })
      .catch(error => done(error));
  });
  it('should not login user with non-exist details, it should return 404', (done) => {
    request(app)
      .post('/api/v1/auth/user/signin')
      .send({ email: 'kazmobileap@gmail.com', password: 'razeem27' })
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        done();
      })
      .catch(error => done(error));
  });
  it('should not login user with incomplete details', (done) => {
    request(app)
      .post('/api/v1/auth/user/signin')
      .send({ email: 'kazmobileapp@gmail.com' })
      .then((res) => {
        expect(res.status).to.be.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        done();
      })
      .catch(error => done(error));
  });
  it('should get all users successfully', (done) => {
    request(app)
      .get('/api/v1/auth/user')
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('rowCount');
        done();
      })
      .catch(error => done(error));
  });
  it('should get a user successfully', (done) => {
    request(app)
      .get('/api/v1/auth/user/900d6eea-d900-4e9d-9bd9-029a838ef67d')
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('data');
        done();
      })
      .catch(error => done(error));
  });
  it('should not get a user with invalid id', (done) => {
    request(app)
      .get('/api/v1/auth/user/900d6eea-d900-4e9d-9bd9-029a838ef37d')
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      })
      .catch(error => done(error));
  });
  it('should patch a user successfully', (done) => {
    request(app)
      .patch('/api/v1/auth/user/900d6eea-d900-4e9d-9bd9-029a838ef67d')
      .send({
        firstName: 'tester',
        lastName: 'testing',
        password: 'Kazeem27',
        address: '27, tunji Olaiya street',
      })
      .then((res) => {
        expect(res.status).to.be.equal(202);
        expect(res.body).to.have.property('data');
        done();
      })
      .catch(error => done(error));
  });
  it('should not patch a user successfully', (done) => {
    request(app)
      .patch('/api/v1/auth/user/900d6eea-d900-4e9d-9bd9-029a838ef67d')
      .send({
        lastName: 'testing',
        password: 'Kazeem27',
        address: '27, tunji Olaiya street',
      })
      .then((res) => {
        expect(res.status).to.be.equal(422);
        expect(res.body).to.have.property('error');
        done();
      })
      .catch(error => done(error));
  });
  it('should delete a user successfully', (done) => {
    request(app)
      .delete('/api/v1/auth/user/900d6eea-d900-4e9d-9bd9-029a838ef67d')
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('message');
        done();
      })
      .catch(error => done(error));
  });
  it('should not delete a user if id does not exist', (done) => {
    request(app)
      .delete('/api/v1/auth/user/900d6eea-r900-4e9d-9bd9-029a838ef67d')
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property('error');
        done();
      })
      .catch(error => done(error));
  });
});
