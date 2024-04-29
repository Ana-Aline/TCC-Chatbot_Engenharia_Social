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
            reject({ message: "É obrigatório informar o código de acesso." });
        }

        let token = "ana";
        if (code == process.env.TOKEN_SECRET) {
            token = jwt.sign({ code }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
            resolve(token);
        } else {
            reject({ message: "Acesso negado." });
        }
    });
}

module.exports = { sendErrorsFromDB, authorize };
