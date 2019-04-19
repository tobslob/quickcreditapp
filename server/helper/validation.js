import Joi from 'joi';

class validate {

    /**
   * 
   * @param {user} object
   */
    static validateUser(user) {
        const schema = Joi.object().keys({
            email: Joi.string().email().trim().required(),
            firstName: Joi.string().trim().required(),
            lastName: Joi.string().trim(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).trim().required(),
            address: Joi.string().required(),
            status: Joi.string().insensitive().valid('unverified', 'verified').required(),
            isAdmin: Joi.string().default('false')
        });
        return Joi.validate(user, schema);
    }

    /**
     * @param{details} string
     */
    static validateLogin(details) {
        const schema = Joi.object().keys({
            email: Joi.string().email().trim().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).trim().required()
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
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).trim().required(),
            address: Joi.string().required()
        });
        return Joi.validate(user, schema);
    }
}

export default validate;