const server = require('./server/config/server')
require('./server/config/database')
require('./server/config/routes')(server)