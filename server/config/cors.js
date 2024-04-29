// Configura a política de compartilhamento de recursos entre diferentes origens
module.exports = function (req, res, next) {
    //aceito todas as origens
    res.header('Acess-Control-Allow-Origin', '*')
    //aceito os métodos listados
    res.header('Acess-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    //aceito esses cabeçalhos
    res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
} 