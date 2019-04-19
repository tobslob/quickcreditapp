import chai from 'chai';
import app from '../app';
import request from 'supertest';
import faker from 'faker';

const expect = chai.expect;

describe('User Route', () => {
    it('should successfully signup a user with valid details', done => {
        request(app)
            .post('/api/v1/user/signup')
            .send({
                email: faker.internet.email(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                password: faker.internet.password(),
                address: faker.address.streetAddress(),
                status: 'unverified',
                isAdmin: 'false'
            })
            .then((res) => {
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('token');
                done();
            }).catch((err) => done(err));
    });
    it('should login user successfully', (done) => { 
        request(app)
            .post('/api/v1/user/signin')
            .send({ email:'kazmobileapp@gmail.com', password: 'Kazeem27' })
            .then((res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.property('token');
                done();
            })
            .catch((error) => done(error));
    });
    it('should get all users successfully', (done) => { 
        request(app)
            .get('/api/v1/user')
            .then((res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('rowCount');
                done();
            })
            .catch((error) => done(error));
    });
    it('should get a user successfully', (done) => { 
        request(app)
            .get('/api/v1/user/900d6eea-d900-4e9d-9bd9-029a838ef67d')
            .then((res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.property('data');
                done();
            })
            .catch((error) => done(error));
    });
    it('should patch a user successfully', (done) => { 
        request(app)
            .patch('/api/v1/user/900d6eea-d900-4e9d-9bd9-029a838ef67d')
            .send({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                password: faker.internet.password(),
                address: faker.address.streetAddress()
            })
            .then((res) => {
                expect(res.status).to.be.equal(202);
                expect(res.body).to.have.property('data');
                done();
            })
            .catch((error) => done(error));
    });
    it('should delete a user successfully', (done) => { 
        request(app)
            .delete('/api/v1/user/900d6eea-d900-4e9d-9bd9-029a838ef67d')
            .then((res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.property('message');
                done();
            })
            .catch((error) => done(error));
    });
});
