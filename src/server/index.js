'use strict';
//const fs = require('fs');
//const config = require('config').get("Costumer");
const fastify = require('fastify');
const path = require('path');

const app = fastify({
	/*http2: true,
	https: {
		allowHTTP1: true, // fallback support for HTTP1
		key: fs.readFileSync(path.join(__dirname, 'cert', 'ssl.key')),
		cert: fs.readFileSync(path.join(__dirname, 'cert', 'ssl.cert'))
	}*/
});

//app.register(require('fastify-ws'));
//app.register(require('fastify-sse'));
app.register(require('fastify-favicon'), {path : __dirname});
app.register(require('fastify-cors'), { origin: "*", optionsSuccessStatus: 200 });
//app.register(require('fastify-compress'));

app.use(require('./middlewares/locale'));

app.register(require('./router/auth'), {prefix: '/auth'});
app.register(require('./router/docs'), {prefix: '/docs'});
app.register(require('./router/quotas'), {prefix: '/quotas'});
app.register(require('./router/translator'), {prefix: '/translator'});
app.register(require('./router/users'), {prefix: '/users'});
app.register(require('./router/watson'), {prefix: '/watson'});


module.exports = {
	start(){
		app.listen(8082, '0.0.0.0', (err, addr) => {
			if(err){
				console.error(err)
			}
			
			console.log(`Server listening on ${addr} on proccess ${process.pid}`)
		});
	}
};