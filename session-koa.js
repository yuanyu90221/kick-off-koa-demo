const koa = require('koa');
const session = require('koa-session');
const app = new koa();
const port = process.argv[2];
app.listen(port);
app.keys = ['secret', 'keys'];
const COOKIE_KEY = 'view';
app.use(session(app));
app.use(function*() {
  // get current view
  // const options = {signed: true};
  // const time = this.cookies.get(COOKIE_KEY,options)? this.cookies.get(COOKIE_KEY,options):1;
  // this.cookies.set(COOKIE_KEY, new Number(time)+1, options);
  let time = this.session.view || 0;
  this.session.view = ++time;
  this.body = `${time} views`;
});