const koa = require('koa');
const parse = require('co-body');
const fs = require('fs');
const app = new koa();
const port = process.argv[2];
app.listen(port);
app.use(function *(){
  this.body = this.request.is('application/json') ? {message: 'hi!'} : 'ok';
});