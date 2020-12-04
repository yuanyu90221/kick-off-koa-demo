const koa = require('koa');
const app = new koa();
const port = process.argv[2];
app.listen(port);
app.use(function *(){
  this.body = 'hello koa';
});