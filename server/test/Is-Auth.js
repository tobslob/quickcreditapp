import chai from 'chai';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import authMiddleware from '../middleware/is-Auth';

process.env.NODE_ENV = 'test';

const { expect } = chai;

describe('Auth middleware', () => {
  it('should throw an error if no authorization header is present', () => {
    const req = {
      get() {
        return null;
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => { })).to.throw(
      'Not authenticated.',
    );
  });
  it('should throw an error if the authorization header is only one string', () => {
    const req = {
      get() {
        return 'xyz';
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
  it('should yield a userId after decoding the token', () => {
    const req = {
      get() {
        return 'Bearer djfkalsdjfaslfjdlas';
      },
    };
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ userId: 'abc' });
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property('userId');
    expect(req).to.have.property('userId', 'abc');
    jwt.verify.restore();
  });

  it('should throw an error if the token cannot be verified', () => {
    const req = {
      get() {
        return 'Bearer xyz';
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
});
