var   express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      scrapper = require("./remixjob-scrapper"),
      app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// custom parameters
var number_of_pages_to_scrap = 5;

/** ** ** ** ** ** **/
/** API GET /POST   */
/** ** ** ** ** ** **/


app.get('/api/v1/jobs', function (req, res) {
  res.write("list of jobs");
  res.end();

}); // end app.get

app.get('/', function (req, res) {
  res.write("aa");
  res.end();

}); // end app.get


app.get('/scrap', function(req, res) {
  var nbPages = number_of_pages_to_scrap;
  scrapper.scrappRemixJob(nbPages,function(hits){
    res.write("done. " + hits.toString() + " jobs found");
    res.end();
  }); // end scrappRemixJob
}); //end app.get /scrap



// receiving the new bet
app.post('/', function(req, res) {



 });



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
