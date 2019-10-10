var express = require('express'); 
var http = require('http');
var url = require('url');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended : true}))
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string",function(req, res) {
    
   var request = req.params.date_string;

   if( request==""){
                date = new Date;
                 answer =' {"unix": '+date.getTime()+', "utc" : "'+date.toUTCString()+'"}'
    }
    else{
        var regex1 =RegExp('^[0-9]+$');
        var regex2 = RegExp('^[0-9]{4}-{1}[0-9]{2}-{1}[0-9]{2}$');
        if (regex1.test(request)){
            var unix = request;
            var date = new Date(parseInt(request));
            utc =  date.toUTCString();
            answer =' {"unix": '+unix+', "utc" : "'+utc+'"}'}
        else if (regex2.test(request)){
                var date = new Date(request)
                unix = date.getTime();
                utc =  date.toUTCString();
                if(utc=="Invalid Date"){answer = {"error" : "Invalid Date" }}
                else{answer =' {"unix": '+unix+', "utc" : "'+utc+'"}'}}
    }





   res.send(answer)
});

app.listen(8080);