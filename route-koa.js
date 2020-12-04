const koa = require('koa');
const app = new koa();
const port = process.argv[2];
app.listen(port);
app.use(function *(next){
  const path = this.path;
  switch(path) {
    case '/':
      this.body = 'hello koa';
      break;
    case '/404':
      this.body = 'page not found';
      break;
    case '/500':
      this.body = 'internal server error';
      break;
    default:
      return yield next;
  }
});