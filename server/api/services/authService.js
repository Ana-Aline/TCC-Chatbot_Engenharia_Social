//Lógica de negócio de autenticação
const _ = require('lodash');
const jwt = require('jsonwebtoken');

function sendErrorsFromDB(res, dbErrors) {
    const errors = [];
    _.forIn(dbErrors.errors, error => errors.push(error.message));
    return res.status(400).json({ errors });
}

function authorize(code) {
    return new Promise((resolve, reject) => {
        if (!code) {
            reject({ message: "It is mandatory to provide the access code!" });
        }

        let token = "";
        if (code == process.env.TOKEN_SECRET) {
            token = jwt.sign({ code }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
            resolve(token);
        } else {
            reject({ message: "Access denied." });
        }
    });
}

module.exports = { sendErrorsFromDB, authorize };
