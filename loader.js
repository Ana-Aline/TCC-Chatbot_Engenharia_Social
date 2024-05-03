const server = require('./server/config/server.js')
require('./server/config/database.js')
require('./server/config/routes.js')(server)