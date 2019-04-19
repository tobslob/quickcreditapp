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
        if (error) return res.status(422).json({
            status: 422,
            message: error.details[0].message
        });
        const hashpassword = Helper.hashPassword(req.body.password);
        const post = {
            id: uuidv4(),
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashpassword,
            status: req.body.status,
            isAdmin: req.body.isAdmin,
            createdOn: moment(new Date()),
            modifiedOn: moment(new Date())
        };
        const user = models.User.find(existUser => existUser.email === req.body.email);
        if (user) return res.status(409).json({
            status: '409',
            message: 'user already exist'
        });
        models.User.push(post);
        const token = Helper.generateToken(models.User[0].id);
        return res.status(201).json({
            status: '201',
            token: token,
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
            return res.status(422).json({
                status: 422,
                message: error.details[0].message
            });
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


    /**
   *
   * @param {req} object
   * @param {res} object
   */
    static getUsers(req, res) {
        const users = models.User;
        if (!users) return res.status(422).json({
            status: '422',
            message: 'an error occur!'
        });
        return res.status(200).json({
            status: '200',
            data: users,
            rowCount: users.length
        });
    }


    /**
   *
   * @param {req} object
   * @param {res} object
   */
    static getUser(req, res) {
        const requestId = req.params.id;
        const users = models.User;
        const user = users.find(oneUser => oneUser.id === requestId);
        if (!user) return res.status('404').json({
            status: '404',
            message: 'user not found'
        });
        return res.status(200).json({
            status: '200',
            data: user
        });
    }


    /**
   *
   * @param {req} object
   * @param {res} object
   */
    static patchUser(req, res) {
        const requestId = req.params.id;
        const users = models.User;
        const user = users.find(oneUser => oneUser.id === requestId);
        if (!user) return res.status('404').json({
            status: '404',
            message: 'user not found'
        });
        const { error } = validate.patchUser(req.body);
        if (error) return res.status(422).json({
            status: 422,
            message: error.details[0].message
        });
        const hashpassword = Helper.hashPassword(req.body.password);
        
        user.firstName = req.body.firstName,
        user.lastName = req.body.lastName,
        user.password = hashpassword,
        user.modifiedOn = moment(new Date());
        
        return res.status(202).json({
            status: '202',
            data: user
        });
    }


    /**
   *
   * @param {req} object
   * @param {res} object
   */
    static deleteUser(req, res) {
        const requestId = req.params.id;
        const users = models.User;
        const user = users.find(oneUser => oneUser.id === requestId);
        if (!user) return res.status('404').json({
            status: '404',
            message: 'user not found'
        });
        const index = users.indexOf(user);
        users.splice(index, 1);
        return res.status(200).json({
            status: '200',
            message: `user with ${requestId} has been deleted`
        });
    }
}

export default userController;
