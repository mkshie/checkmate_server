const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

//const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");


exports.editUser = async function (id, nickname) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const editUserResult = await userDao.updateUserInfo(connection, id, nickname)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}


exports.deleteUser = async function (id) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const editUserResult = await userDao.updateUserStatus(connection, id)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}


exports.modifyAcceptanceStatus = async function (id) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        const searchAcceptanceStatus = await userDao.selectAcceptanceStatus(connection, id);

        if (searchAcceptanceStatus.acceptanceStatus==1)
            await userDao.updateAcceptanceStatus_0(connection, id);
        if (searchAcceptanceStatus.acceptanceStatus==0)
            await userDao.updateAcceptanceStatus_1(connection, id);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}