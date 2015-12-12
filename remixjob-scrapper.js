var   fs = require('fs'),
      cheerio = require('cheerio'),
      request = require('request');

/** parameters
  * @nbPages : number or pages to scrapp
  * return : number of jobs scrapped
*/
var remixUrl = "https://remixjobs.com/";

exports.scrappRemixJob = function(nbPages, exportCallback) {

  var req = request(remixUrl, function(error, response, html){

        var hits = 0;
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
                   //clean the job title field
                   var item_title = ($('.job-title', this).text()).replace(/(\r\n|\n|\r)/gm," ").replace(/^\s+|\s+$/g, "");

                  json_job.id  = $(this).attr('data-job-id');
                  json_job.title = item_title;
                  json_job.company = $('.company', this).text();
                  json_job.localization.data_workplace_name = $('.workplace', this).attr('data-workplace-name');
                  json_job.localization.data_workplace_lat = $('.workplace', this).attr('data-workplace-lat');
                  json_job.localization.data_workplace_lng = $('.workplace', this).attr('data-workplace-lng');
                  json_job.contract = $('.contract', this).attr('data-contract-type');
                  json_job.date = item_date;
                  json_job.tags = item_tags;

                data.records.push(json_job);
                hits++;
              });

              fs.writeFileSync('./data.json', JSON.stringify(data));

         }
         exportCallback(hits);

       }); // end request
} // end exports.scrappRemixJob
