import chai from "chai";
import app from "../app";
import request from "supertest";
import faker from "faker";

const expect = chai.expect;

describe("User Signup", () => {
  it("should successfully signup a user with valid details", done => {
      request(app)
          .post("/api/v1/user/signup")
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
              done();
          }).catch((err) => done(err));
  });
});
