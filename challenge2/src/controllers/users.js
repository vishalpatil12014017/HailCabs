const { validationResult } = require("express-validator");
const response = require("../lib/response");
const constant = require("../constants/constants");
const jwt = require("jsonwebtoken");
const query = require("../lib/queries/users");
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: users } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, totalPages, currentPage, users };
};

const genNewToken = async (payload, res) => {
  try {
    const expireIn = constant.jwt.ADMIN_TOKEN_EXPIRE;
    var token = jwt.sign(payload, constant.jwt.SECRET, {
      expiresIn: expireIn || constant.jwt.EXPIRE, // expires in 24 hours
    });
    return token;
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      "Error in generating token",
      null,
      res
    );
  }
};

// Retrieve all Users from the database.
exports.create = async (req, res) => {
  const email = req.body.email;
  try {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }
    let User = await query.getSingle({where:{email}});
    if (!User) {
      User = await query.create(req.body);
    }
    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      null,
      res
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

// Retrieve all Users from the database.
exports.userLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    let User = await query.getSingle({where:{email}});
    if (!User) {
      return response.sendResponse(
        constant.response_code.NOT_FOUND,
        `Cannot find User with email=${email}.`,
        null,
        res,
        errors
      );
    } else {
      if (User.password !== password) {
        return response.sendResponse(
          constant.response_code.UNAUTHORIZED,
          `password does not match`,
          null,
          res,
          errors
        );
      } else {
        var user = User;
        var userDataForToken = {
          id: user.id,
          firstName: user.firstName,
          role: user.role,
          email: user.email,
        };
        let token = await genNewToken(userDataForToken, res);
        return response.sendResponse(
          constant.response_code.SUCCESS,
          "Success",
          { ...User, token },
          res
        );
      }
    }
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

// Retrieve all user from the database.
exports.findAll = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    let UserList = await query.getAllWithPagination({
      limit,
      offset,
    });
    console.log(UserList);
    const result = getPagingData(UserList, page, limit);
    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      result,
      res
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

// Retrieve all Users from the database.
exports.findAllWithoutPagination = async (req, res) => {
  try {
    let UserList = await query.getAll({});
    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      UserList,
      res
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

