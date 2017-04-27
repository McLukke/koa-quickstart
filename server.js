var koa = require('koa');
var app = new koa();

var requestTime = function(headerName) {
  return function *(next) {
    var start = new Date();
    yield next;
    var end = new Date();
    var ms = end - start;
    this.set(headerName, ms + 'ms');
  }
}

app.use(requestTime('Response-time'));

app.use(function *(){
  console.log(this.request);

  var url = this.request.url;
  if (url === '/') {
    this.body = 'Hello from koajs';
  } else if (url === '/date') {
    this.body = new Date();
  } else {
    this.status = 404;
    this.body = 'Sorry, I don\'t know what you want'
  }
});

app.listen(4000);
