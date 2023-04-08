const constant = require("../constants/constants");
module.exports = (sequelize, DataType) => {
  const user = sequelize.define(
    constant.DB.table.USERS_MASTER,
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
      },
      firstName: {
        type: DataType.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataType.STRING,
        allowNull: true,
      },
      email: {
        type: DataType.STRING,
        allowNull: true,
      },
      password: {
        type: DataType.STRING,
        allowNull: true,
      },
      role:{
        type: DataType.STRING,
        allowNull: true,
      }
    },
    {
      hooks: {
        beforeCreate: async (record, options) => {
          record.dataValues.createdAt = Math.floor(Date.now());
          record.dataValues.updatedAt = Math.floor(Date.now());
        },
        beforeUpdate: async (record, options) => {
          record.dataValues.updatedAt = Math.floor(Date.now());
        },
        beforeBulkUpdate: (record, options) => {
          record.attributes.updatedAt = Math.floor(Date.now());
        },
        beforeBulkCreate: (record, options) => {
          record.attributes.createdAt = Math.floor(Date.now());
          record.dataValues.updatedAt = Math.floor(Date.now());
        },
      },
    }
  );
  return user;
};
