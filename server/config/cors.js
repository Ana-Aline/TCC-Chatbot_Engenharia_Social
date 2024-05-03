// Configura a política de compartilhamento de recursos entre diferentes origens
module.exports = function (req, res, next) {
    //aceito todas as origens
    res.header('Access-Control-Allow-Origin', '*')
    //aceito os métodos listados
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    //aceito esses cabeçalhos
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
} 