import Joi from 'joi';

class Validation {
  /**
   *
   * @param {user} object
   */
  static validateUser(user) {
    const schema = Joi.object().keys({
      email: Joi.string().email().trim().required(),
      firstName: Joi.string().regex(/^[A-Z]+$/).trim().uppercase()
        .required()
        .error(() => 'first name is required without a number'),
      lastName: Joi.string().regex(/^[A-Z]+$/).trim().uppercase()
        .error(() => 'last name is required without a number'),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).trim().required()
        .error(() => 'you must provide password'),
      address: Joi.string().trim().required()
        .error(() => 'Address can not be empty'),
    });
    return Joi.validate(user, schema);
  }


  /**
     * @param{details} string
     */
  static validateLogin(details) {
    const schema = Joi.object().keys({
      email: Joi.string().email().trim().required()
        .error(() => 'please provide a valid mail'),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).trim().required()
        .error(() => 'password is required'),
    });
    return Joi.validate(details, schema);
  }

  /**
   *
   * @param {user} object
   */
  static patchUser(user) {
    const schema = Joi.object().keys({
      firstName: Joi.string().trim().required()
        .error(() => 'first name can not be empty'),
      lastName: Joi.string().trim()
        .error(() => 'flast name can not be empty'),
      address: Joi.string().required()
        .error(() => 'please provide a valid address'),
    });
    return Joi.validate(user, schema);
  }


  /**
   *
   * @param {loan} object
   */
  static validateLoan(loan) {
    const schema = Joi.object().keys({
      tenor: Joi.number().integer().min(1).max(12)
        .required()
        .error(() => 'tenor must be in between 1 and 12'),
      amount: Joi.number().min(500).max(96547839593).required()
        .error(() => 'amount can not be lesser than 500'),
    });
    return Joi.validate(loan, schema);
  }

  /**
   *
   * @param {user} object
   */
  static validateVerify(user) {
    const schema = Joi.object().keys({
      status: Joi.string().insensitive().valid('unverified', 'verified').required()
        .error(() => 'input the right word'),
    });
    return Joi.validate(user, schema);
  }

  /**
   *
   * @param {user} object
   */
  static loanApproveValidate(user) {
    const schema = Joi.object().keys({
      status: Joi.string().insensitive().valid('approved', 'reject').required()
        .error(() => 'input the right word'),
    });
    return Joi.validate(user, schema);
  }

  /**
   *
   * @param {user} object
   */
  static validateLoanRepayment(loan) {
    const schema = Joi.object().keys({
      paidAmount: Joi.number().min(500).required()
        .error(() => 'amount can not be lesser than 500'),
    });
    return Joi.validate(loan, schema);
  }


  /**
   *
   * @param {email} object
   */
  static validateMailer(email) {
    const schema = Joi.object().keys({
      email: Joi.string().email().trim().required()
        .error(() => 'invalid email'),
    });
    return Joi.validate(email, schema);
  }


  /**
   *
   * @param {user} object
   */
  static validatePassword(passDetails) {
    const schema = Joi.object().keys({
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).trim().required()
        .error(() => 'incorrect password'),
      // password must be a valid string and is required
      passwordConf: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).trim().required()
        .error(() => 'incorrect password'),
    });
    return Joi.validate(passDetails, schema);
  }
}

export default Validation;
