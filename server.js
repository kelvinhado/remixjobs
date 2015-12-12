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
                             localization: {
                                data_workplace_name: "",
                                data_workplace_lat: 0.0,
                                data_workplace_lng: 0.0
                             },
                             //category : "",
                             //description :"",
                             contract :"",
                             date : "",
                             tags: []
                           };

                   //date formating if today (we do not want "il y a 3 heures")
                   var item_date = $('.job-details-right', this).text();
                   if(item_date.indexOf("heures") > -1) {
                     item_date = Date.now();
                   }
                   //adding tags to the json
                   var item_tags = [];
                   $('.job-tags .tag', this).each(function(i, elem) {
                     item_tags.push($(this).attr('data-tag-name'));
                   });


                  json_job.id  = $(this).attr('data-job-id');
                  json_job.title = ($('.job-title', this).text()).replace(/(\r\n|\n|\r)/gm," ").replace(/^\s+|\s+$/g, ""); // text cleaned from extra /n and spaces
                  json_job.company = $('.company', this).text();
                  json_job.localization.data_workplace_name = $('.workplace', this).attr('data-workplace-name');
                  json_job.localization.data_workplace_lat = $('.workplace', this).attr('data-workplace-lat');
                  json_job.localization.data_workplace_lng = $('.workplace', this).attr('data-workplace-lng');
                  json_job.contract = $('.contract', this).attr('data-contract-type');
                  json_job.date = item_date;
                  json_job.tags = item_tags;

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
