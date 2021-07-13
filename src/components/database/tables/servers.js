const Sequelize = require('sequelize');
const mysql = require('../secure/sequelize');

const Servers = mysql.define('servers', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    OwnerName: {
        type: Sequelize.STRING(20),
        allowNull: false
    },

    OwnerId: {
        type:Sequelize.BIGINT,
        allowNull: false
    },

    GuildName: {
        type: Sequelize.STRING(20),
        allowNull: false
    },

    GuildId: {
        type: Sequelize.BIGINT,
        allowNull: false
    },

    Plan: {
        type: Sequelize.STRING,
        allowNull: false
    },

    TimeOutRole: {
        type: Sequelize.BIGINT,
        allowNull: false
    }
});

module.exports = Servers