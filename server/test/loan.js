
import chai from 'chai';
import app from '../app';
import request from 'supertest';
        
const expect = chai.expect;
        
describe('Loan Route', () => {
    it('should post a user loan successfully', (done) => {
        request(app)
            .post('/api/v1/loan')
            .send({ amount: 2000.567, tenor: 3 })
            .then((res) => {
                expect(res.status).to.be.equal(201);
                expect(res.body).to.have.property('data');
                done();
            })
            .catch((error) => done(error));
    });
    it('should not post a user loan successfully', (done) => {
        request(app)
            .post('/api/v1/loan')
            .send({ amount: 2000.567, tenor: 3 })
            .then((res) => {
                expect(res.status).to.be.equal(402);
                expect(res.body).to.have.property('message');
                done();
            })
            .catch((error) => done(error));
    });
});
        