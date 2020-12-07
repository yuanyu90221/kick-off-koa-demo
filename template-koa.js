const koa = require('koa');
const views = require('co-views');
const path = require('path');
const app = new koa();
const port = process.argv[2];
app.listen(port);
app.keys = ['secret', 'keys'];
const render = views(path.join(__dirname, 'views'), {
  ext: 'ejs'
});
var user = {
  name: {
    first: 'Tobi',
    last: 'Holowaychuk'
  },
  species: 'ferret',
  age: 3
};
app.use(function*() {
  this.body = yield render('user', {user: user});
});