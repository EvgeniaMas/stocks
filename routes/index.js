// Import Express and Router
var express = require('express');
var router = express.Router();
var Quandl = require('quandl');
var moment = require("moment");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
// Get
router.get('/', function(req, res) {
  res.render('index', {
	  
  });
});


router.get('/chat', function(req, res) {
  res.render('chat', {
	  title: 'Chat',
	  lead: 'Discuss here all what you want'
  });
});


router.get('/stocks', urlencodedParser, (req, res) => {
   res.render('stocks', {
    
  });
});

router.post('/stocks', urlencodedParser, (req, res) => {
var search = req.body.search;
var lookFor = search.toUpperCase();
var userSet = [];
var fileContent = fs.readFileSync('quandl.txt', "utf8");


if (fileContent.indexOf(lookFor) === -1){   
    fs.appendFile('quandl.txt', lookFor + ',');
    userSet = fs.readFileSync('quandl.txt', "utf8").split(',');
    console.log(userSet); 
   }
else {
  userSet = fs.readFileSync('quandl.txt', "utf8").split(',');
    console.log("no changes for userSet");  
    console.log(userSet); 
  }


var today = moment().format('YYYY-MM-DD');


quandl.dataset({
  source: "WIKI",
  table: lookFor
}, {
  order: "asc",
  exclude_column_names: true,
  // Notice the YYYY-MM-DD format 
  // start_date: "2017-01-01",
  end_date: today,
  column_index: 4
}, function(err, datas){
    if(err)
        throw err;
        var dataToPresent = JSON.parse(datas);
        res.render('stocks', {
        data: 'dataToPresent',
      
  });

});


});



// router.post('/index', function(req, res) {

// var quandl = new Quandl({
//     auth_token: "yKkGwUrx_t251z19rJvG",
//     api_version: 3,   
// });


// var search = req.body.search;
// var today = moment().format('YYYY-MM-DD');

// quandl.dataset({
//   source: "WIKI",
//   table: search
// }, {
//   order: "asc",
//   exclude_column_names: true,
//   // Notice the YYYY-MM-DD format 
//   // start_date: "2017-01-01",
//   end_date: today,
//   column_index: 4
// }, function(err, datas){
//     if(err)
//         throw err;
//         var dataToPresent = JSON.parse(datas);
//         res.render('index', {
//       data: 'dataToPresent',
      
//   });
// });

  // res.render('chat', {
	 //  title: 'Chat',
	 //  lead: 'Discuss here all what you want'
  // });




module.exports = router;
