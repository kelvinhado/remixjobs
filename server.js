var   express = require('express'),
      fs = require('fs'),
      cheerio = require('cheerio'),
      request = require('request'),
      path = require('path'),
      bodyParser = require('body-parser'),
      app = express();


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/v1/jobs', function (req, res) {
  res.write("list of jobs");
  res.end();

}); // end app.get

app.get('/', function (req, res) {
  res.write("aa");
  res.end();

}); // end app.get


app.get('/scrap', function(req, res) {


  // var url = req.body.url;
  var url = "https://remixjobs.com/";
  var req = request(url, function(error, response, html){

        var strResult = "";
        var data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

         if(!error){
             var $ = cheerio.load(html);


              // for each job item in the html
              $('.jobs-list .job-item').each(function(i, elem) {

                var json_job = {
                             id : "",
                             title : "",
                             company : "",
                             localization: "",
                             category : "",
                             description :"",
                             contract :"",
                             date : "",
                             tags: ""};

                  json_job.id  = $(this).attr('data-job-id');
                  json_job.title = ($('.job-title', this).text()).replace(/(\r\n|\n|\r)/gm," ").replace(/^\s+|\s+$/g, "");
                  json_job.company = $('.company', this).text();
                  json_job.localization = $('.workplace', this).text();
                  json_job.contract = $('.contract', this).attr('data-contract-type');
                //  json_job.date = $('.workplace a', this).text();
                //  json_job.category = $('.workplace a', this).text();
                //  json_job.tags = $('.workplace a', this).text();

                data.records.push(json_job);

              //  strResult[i] =  $(this).html();
              });

              fs.writeFileSync('./data.json', JSON.stringify(data));
              strResult = "done.";
         }

         res.write(strResult.toString());
         res.end();
 }); // end request
 });


// receiving the new bet
app.post('/', function(req, res) {



 });



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
