const { sendErrorsFromDB, authorize } = require('../services/authService');
const Auth = require('../model/authModel')

function postAuth(req, res) {
    const code = req.body.codeSecret || '';

    authorize(code)
        .then(token => {
            const newBody = new Auth({
                codeSecret: token
            });
            console.log("Meu token: " + `${token}`)
            newBody.save().then(result => {
                return res.status(200).json({ 
                    msg: `Olá, seja bem-vindo ao TCC da Ana Aline`, 
                    token: `${token}`, code: `${code}` });
            }).catch(err => {
                return sendErrorsFromDB(res, err);
            });
        })
        .catch(err => {
            return res.status(401).send({ alert: [err.message] });
        });
}

module.exports = { postAuth };