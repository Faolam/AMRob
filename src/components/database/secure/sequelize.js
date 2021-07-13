const { database } = require('../../config/general.json');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(database.data_name, database.data_user, database.data_password, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    port: 3306
});

module.exports = sequelize