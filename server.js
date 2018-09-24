const express=require('express');
const hbs = require('hbs');
const fs=require('fs');

var port=process.env.PORT || 3000;

var app=express();

// 1. retrieve static pages
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.use((req, res, next)=> {
   var now=new Date().toString();
   var logStr=`${now}: ${req.method} ${req.url}`;
   console.log(logStr);
   fs.appendFile('server.log',logStr + '\n',(err) => {
     console.log('unable to append to server log');
   });
   next();
});

// app.use( (req,res, next)=> {
//    res.render('maintenance.hbs',{
//      pageTitle:'Maintenance',
//      currentYear:2017
//    });
// })


hbs.registerHelper('getCurrentYear',()=> {
  return 'test';
  // return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=> {
  return text.toUpperCase();
});

//2.  send data/text

// handler for http request
// app.get('/', (req, res) => {
//   res.send('hello');
// });

// app.get('/', ((req,res) => {
//    res.render('./views/home.hbs',{
//       pageTitle :'Home page',
//       currentYear: new Date().getFullYear(),
//       welcomeMsg:'you did it'
//    });
//  });
// );

app.get('/',(req,res)=>{
   res.render('home.hbs',{
     pageTitle :'Home page',
     welcomeMsg:'you did it'
   });
});

app.get('/about',(req,res)=>{
   res.render('about.hbs',{
     pageTitle :'About page',
   });
});


app.get('/project', (req,res) => {
   res.render('project.hbs', {
      pageTitle:'Projects'
   });
});

app.get('/bad', (req,res) => {
   res.send({
     errorMessage:'bad page'
   });
});




// start server listening
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
