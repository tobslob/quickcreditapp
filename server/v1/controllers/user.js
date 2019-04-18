import models from '../model/db';
import validate from '../../helper/validation';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import Helper from '../../helper/helper';

class userController {
    /**
   *
   * @param {req} object
   * @param {res} object
   */
    static createUser(req, res) {
        const { error } = validate.validateUser(req.body);
        if (error)
            return res.status(422).json({ message: error.details[0].message });
        const post = {
            id: uuidv4(),
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            status: req.body.status,
            isAdmin: req.body.isAdmin,
            createdOn: moment(new Date()),
            modifiedOn: moment(new Date())
        };
        models.User.push(post);
        return res.status(201).json({
            status: '201',
            data: post
        });
    }

    /**
   *
   * @param {req} object
   * @param {res} object
   */
    static loginUser(req, res) {
        const { error } = validate.validateLogin(req.body);
        if (error)
            return res.status(422).json({ message: error.details[0].message });
        const users = models.User;
        const user = users.find(specUser => specUser.email === req.body.email);
        if (!user) return res.status(404).json({
            status: '404',
            message: 'no user with such email'
        });
        if (!Helper.comparePassword(user.password, req.body.password)) {
            return res.status(401).json({
                status: '401',
                'message': 'Authentication failed'
            });
        }
        const token = Helper.generateToken(user.id);
        return res.status(200).json({
            status: '200',
            token: token,
            data: user
        });
    }
}

export default userController;
