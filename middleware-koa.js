const koa = require('koa');
const app = new koa();
const port = process.argv[2];
app.listen(port);
app.use(responseTime());
app.use(upperCase());
function responseTime() {
  return function* (next) {
    const startTime = new Date();
    yield next;
    this.set('X-Response-Time', new Date - startTime);
  }
}
function upperCase() {
  return function* (next) {
    yield next;
    this.body = this.body.toUpperCase();
  }
}
app.use(function *(){
  this.body = 'hello koa';
});