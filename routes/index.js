var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var moment = require('moment');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('birthday');   //render() looks for a file in views
});


router.post('/postbirthday', function(req,res){
  var bdate = moment(req.body.dob).format('DD-MM');
  console.log(bdate);
  // var Time = moment().format('hh:mm:ss:a');
  // console.log(Time);
  var Date = moment().format('DD-MM');
  console.log(Date);
  if(bdate==Date){
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Your mail ID here',
      pass: 'Your password here'
    }
    });

    var mailOptions = {
      from: 'Dear Friend',
      to: req.body.email,
      subject: 'Birthday Wishes',
      text: 'Hi ' + req.body.name+ ' Happy Birthday!!!'+'\n'+req.body.message
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent');
        res.send(info);
      }
    });
  }
});


module.exports = router;
