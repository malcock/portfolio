var express     = require('express');
var fs          = require('fs');
var path        = require('path');



var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views','./views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function(req,res){
//     res.render('index', {title:'Martin Alcock / UX / Front End Dev / Creative Type', message:'hello there!'})
// })
// app.get('/uncommon-people', function(req,res){
//   res.render('uncommon-people')
// })

app.use(/^\/.*/,function(req,res){
  if(req.originalUrl=="/") {
    req.originalUrl = "index"
  } else {
    req.originalUrl = req.originalUrl.substr(1);
  }
  fs.exists("./views/" + req.originalUrl + ".pug", function(exists){
    if(!exists){
      req.originalUrl = "404";
    }
    res.render(req.originalUrl + ".pug")
  });

})

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
