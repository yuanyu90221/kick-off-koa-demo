const koa = require('koa');
const app = new koa();
const port = process.argv[2];
app.listen(port);
app.use(errorHandler());
function errorHandler() {
  return function* (next) {
    try {
      yield next
    } catch (error) {
      this.status = 500;
      this.body = 'internal server error';
    }
  }
}
app.use(function *(){
  if (this.path === '/error') throw Error('ooops');
  this.body = 'OK';
});