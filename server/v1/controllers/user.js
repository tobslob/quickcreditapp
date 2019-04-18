import models from "../model/db";
import validateUser from "../validation";
import uuidv4 from "uuid/v4";
import moment from "moment";

class userController {
  /**
   *
   * @param {req} object
   * @param {res} object
   */
  static createUser(req, res) {
    const { error } = validateUser(req.body);
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
      status: "201",
      data: post
    });
  }
}

export default userController;
