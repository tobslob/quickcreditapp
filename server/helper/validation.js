import Joi from 'joi';

class validate {
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
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).trim().required(),
      address: Joi.string().trim().required(),
    });
    return Joi.validate(user, schema);
  }


  /**
     * @param{details} string
     */
  static validateLogin(details) {
    const schema = Joi.object().keys({
      email: Joi.string().email().trim().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).trim().required(),
    });
    return Joi.validate(details, schema);
  }

  /**
   *
   * @param {user} object
   */
  static patchUser(user) {
    const schema = Joi.object().keys({
      firstName: Joi.string().trim().required(),
      lastName: Joi.string().trim(),
      address: Joi.string().required(),
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
        .required(),
      amount: Joi.number().min(500).required(),
    });
    return Joi.validate(loan, schema);
  }

  /**
   *
   * @param {user} object
   */
  static validateVerify(user) {
    const schema = Joi.object().keys({
      status: Joi.string().insensitive().valid('unverified', 'verified').required(),
    });
    return Joi.validate(user, schema);
  }

  /**
   *
   * @param {user} object
   */
  static loanApproveValidate(user) {
    const schema = Joi.object().keys({
      status: Joi.string().insensitive().valid('approved', 'reject').required(),
    });
    return Joi.validate(user, schema);
  }

  /**
   *
   * @param {user} object
   */
  static validateLoanRepayment(loan) {
    const schema = Joi.object().keys({
      paidAmount: Joi.number().min(500).required(),
    });
    return Joi.validate(loan, schema);
  }


  /**
   *
   * @param {email} object
   */
  static validateMailer(email) {
    const schema = Joi.object().keys({
      email: Joi.string().email().trim().required(),
    });
    return Joi.validate(email, schema);
  }


  /**
   *
   * @param {user} object
   */
  static validatePassword(passDetails) {
    const schema = Joi.object().keys({
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).trim().required(),
      // password must be a valid string and is required
      passwordConf: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).trim().required(),
    });
    return Joi.validate(passDetails, schema);
  }
}

export default validate;
