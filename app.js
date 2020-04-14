const express = require('express');
var bodyParser = require('body-parser')
const app = express();
var mysql = require('mysql');
const path = require('path');
const router = express.Router();
// var nodemailer = require('nodemailer')

var cons = require('consolidate');

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');



var urlencodedParser = bodyParser.urlencoded({ extended: false })
//database conections

let con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'igdent'
});
con.connect(function(error){
  if (error) throw error;
  console.log('conectat')
})

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


// router.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/index.html'));
//   //__dirname : It will resolve to your project folder.
// });


var server_port=process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';





app.get('/', function (req, res) {
  res.render('index.html');
});
app.get('/contact', function (req, res) {
  res.render('contact.html');
});
app.post('/contact', urlencodedParser, function (req, res) {
  // if (!req.body) return res.status(400);
  // console.log(req.body);
  // const message = {
    
  //   to: req.body.email,
  //   subject: 'felicitari',
  //   text:`mesaj trimis

  //   datele voastre 
  //   username: ${req.body.username}
  //   phone: ${req.body.phone}
  //   email: ${req.body.email} 
  //   msg: ${req.body.msg}`

  // }
  // mailer(message);
  let sql;
  sql = "INSERT INTO `user_info` (`user_name`, `user_phone`, `user_email`, `msg`) VALUES ('" + req.body.username + "','" + req.body.phone + "','" + req.body.email + "','" + req.body.msg + "')";
  con.query(sql, function (error, resultQuery) {
    if (error) throw error;
    console.log('1 user info saved');
    // console.log(resultQuery);
  res.render('contact.html');
  // res.redirect('/');
})
});

// mailer send mesaje
// const transporter = nodemailer.createTransport(
//   {
//   host: 'smtp.ethereal.email',
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//       user: 'gerda.lubowitz32@ethereal.email',
//       pass: '4Vg7uvm2HkHEBKuaDb'
//   }
  
  
// },{
//   from: 'Mailer test <gerda.lubowitz32@ethereal.email>',
// })

// const mailer = message =>{
//   transporter.sentMail(message, (err, info) => {
//    if(err) return console.log(err)
//    console.log('Email sent:', info)
//   })
// }

// router.get('/contact.html',function(req,res){
//     res.sendFile(path.join(__dirname+'/contact.html'));
//     //__dirname : It will resolve to your project folder.
//   });
app.use(express.static(__dirname + '/Script'));

//add the router
app.use('/', router);
app.listen(server_port, erver_ip_address, function(){
  console.log("Listening on "+ server_ip_address +",server_port"+server_port);
});

// console.log('Running at Port 3000');

// app.get('/contact', function (req, res) {
//   let sql;
//   sql = "INSERT INTO `user_info` (`user_name`, `user_phone`, `user_email`, `msg`) VALUES ('" + req.username + "','" + req.phone + "','" + req.email + "','" + req.msg + "')";
//   con.query(sql, function (error, resultQuery) {
//     if (error) throw error;
//     console.log('1 user info saved');
//     console.log(resultQuery);
// })
// })


// app.get('/contact', function (req, res) {
//   console.log(req);
//   var username = req.username;
//   var phone = req.phone;
//   var email = req.email;
//   var msg  = req.msg ;
//   con.connect(function (error) {
//       if (error) throw error;
//       console.log("connected");

//       var sql = "INSERT INTO `user_info` (`user_name`, `user_phone`, `user_email`, `msg`) VALUES ('" + req.username + "','" + req.phone + "','" + req.email + "','" + req.msg + "')";
//       con.query(sql, function (error) {
//           if (error) throw error;
//           console.log("One record inserted");
//       });
//   });
//   res.render('contact-success', { data: req.body });
//   connection.end();
// });