const UserService = require("../services/userService.js");
const { AppError } = require("../utils/errors");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  register = async (req, res, next) => {
    try {
      const userData = req.body;
      const result = await this.userService.register(userData);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await this.userService.login({ email, password });
      res.cookie("token", result.token);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };

  getUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUser(id);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userData = req.body;
      const user = await this.userService.updateUser(id, userData);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UserController();