import chai from 'chai';
import app from '../app';
import request from 'supertest';
import faker from 'faker';

const expect = chai.expect;

let email, password;

describe('User Signup', () => {
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
                email = res.body.email;
                password = res.body.password;
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                done();
            }).catch((err) => done(err));
    });
    it('should login user successfully', (done) => { 
        request(app)
            .post('/api/v1/user/signin')
            .send({ email, password })
            .then((res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.property('token');
                done();
            })
            .catch((error) => done(error));
    });
});
