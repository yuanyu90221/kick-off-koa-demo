const koa = require('koa');
const parse = require('co-body');
const fs = require('fs');
const app = new koa();
const port = process.argv[2];
app.listen(port);
app.use(function *(next){
  const path = this.path;
  switch(path) {
    case '/':
      if (this.method === 'POST') {
        const body = yield parse(this,{limit: '1kb'});
        if (!body.name) this.throw(400, '.name required');
        const name = body.name;
        this.body = name.toUpperCase();
      } else {
        this.body = 'hello koa';
      }
      break;
    case '/json':
      this.body = {foo: 'bar'};
      break;
    case '/stream':
      this.body = fs.createReadStream(process.argv[3]);
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