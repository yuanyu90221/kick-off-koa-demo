const koa = require('koa');
const parse = require('co-body');
const session = require('koa-session');
const app = new koa();
const port = process.argv[2];
app.listen(port);
app.keys = ['secret1', 'secret2', 'secret3'];
const COOKIE_KEY = 'view';
var form = '<form action="/login" method="POST">\
<input name="username" type="text" value="username">\
<input name="password" type="password" placeholder="The password is \'password\'">\
<button type="submit">Submit</button>\
</form>';
app.use(session(app));
app.use(function* home(next) {
  if (this.request.path !== '/') return yield next;
  const authenticated = this.session.authenticated;
  if (authenticated) {
    this.body = `hello world`;
  } else {
    this.status = 401;
  }
});

app.use(function* login(next) {
  if (this.request.path !== '/login') return yield next;
  if (this.request.method === 'GET') return this.body = form;
  if (this.request.method === 'POST') {
    const body = yield parse(this,{limit: '1kb'});
    let {username, password} = body;
    if (username==='username'&&password==='password') {
      this.session.authenticated = true;
      this.redirect('/');
    } else {
      this.status = 400;
      this.body = 'authentication failed';
    }
  }
});

app.use(function* logout(next){
  if (this.request.path !== '/logout') return yield next;
  this.session.authenticated = false; 
  this.redirect('/login');
});