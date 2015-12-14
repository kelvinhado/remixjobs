var   fs = require('fs'),
      cheerio = require('cheerio'),
      request = require('request'),
      async = require('async'),
      Job = require('./remixjob-model');

/** parameters
  * @nbPages : number or pages to scrapp
  * return : number of jobs scrapped
*/
var remixUrl = "https://remixjobs.com";

exports.scrappRemixJob = function(nbPages, exportCallback) {

  var hits = 0;
  var data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

  // this function will run n times the same code and stop when every callback have been called.
  async.times(nbPages, function(n, next){
      var url = generateUrl(n+1);
      var req = request(url, function(error, response, html){
            var jsonResult;
             if(!error){
                jsonResult = scrappHtml(html);
             }//end if request error
             next(error, jsonResult);
      }); // end request
  }, function(error, jsonResults) { //jsonResults (with s) contain all the results

    // merging results
    // we do have n table of results inside jsonResults, let's merge them all
      for(var i=1; i<jsonResults.length; i++) {
        jsonResults[0] = jsonResults[0].concat(jsonResults[i]);
      }

       data.records = jsonResults[0];
       fs.writeFileSync('./data.json', JSON.stringify(data));
       exportCallback(data.records.length);
    });

}; // end exports.scrappRemixJob


function generateUrl(page) {
  return remixUrl + "/?page=" + page + "&in=all";
}

/**
 * @return jobResults in Json format
 */
function scrappHtml(html){

       var jsonResult = [];
       var $ = cheerio.load(html);
        // for each job item in the html
        $('.jobs-list .job-item').each(function(i, elem) {

          var json_job = {
                       id : "",
                       title : "",
                       company : "",
                       url: "",
                       localization: {
                          data_workplace_name: "",
                          data_workplace_lat: 0.0,
                          data_workplace_lng: 0.0
                       },
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
             // build job url base on rmx domain
             var item_url = remixUrl + $('.job-link', this).attr('href');

            // json_job.id  = $(this).attr('data-job-id');
            // json_job.title = item_title;
            // json_job.url = item_url;
            // json_job.company = $('.company', this).text();
            // json_job.localization.data_workplace_name = $('.workplace', this).attr('data-workplace-name');
            // json_job.localization.data_workplace_lat = $('.workplace', this).attr('data-workplace-lat');
            // json_job.localization.data_workplace_lng = $('.workplace', this).attr('data-workplace-lng');
            // json_job.contract = $('.contract', this).attr('data-contract-type');
            // json_job.date = item_date;
            // json_job.tags = item_tags;


                      var job = new Job();
                      job.id  = $(this).attr('data-job-id');
                      job.title = item_title;
                      job.url = item_url;
                      job.company = $('.company', this).text();
                      job.localization.data_workplace_name = $('.workplace', this).attr('data-workplace-name');
                      job.localization.data_workplace_lat = $('.workplace', this).attr('data-workplace-lat');
                      job.localization.data_workplace_lng = $('.workplace', this).attr('data-workplace-lng');
                      job.contract = $('.contract', this).attr('data-contract-type');
                      job.date = item_date;
                      job.tags = item_tags;
                      // save the bear and check for errors
                      job.save(function(err) {
                          if (err)
                              console.log(err);
                      });


        //  jsonResult.push(json_job);
        }); //end for each job_item in list
        return "xx";
}
