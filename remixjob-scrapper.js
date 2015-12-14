var   fs = require('fs'),
      cheerio = require('cheerio'),
      request = require('request'),
      async = require('async'),
      Job = require('./remixjob-model');


var remixUrl = "https://remixjobs.com";

exports.scrappRemixJob = function(nbPages, exportCallback) {

  // this function will run n times the same code and stop when every callback have been called.
  async.times(nbPages, function(n, next){
      var url = generateUrl(n+1);
      var req = request(url, function(error, response, html){
            var local_hits = 0;
             if(!error){
                scrappHtml(html);
             }//end if request error
             next(error, local_hits);
      }); // end request
  }, function(error, local_hits_table) { //jsonResults (with s) contain all the results

      var total_hits = 0;
      for(var i=0; i<total_hits.length; i++) {
        total_hits += local_hits_table[i];
      }
       exportCallback(total_hits);
    });

}; // end exports.scrappRemixJob


function generateUrl(page) {
  return remixUrl + "/?page=" + page + "&in=all";
}


/**
 *  SCRAP adn SAVE jobs into the db
 */
function scrappHtml(html){
       var $ = cheerio.load(html);
        // for each job item in the html
        $('.jobs-list .job-item').each(function(i, elem) {

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

                  console.log("saving : " + job.id );
              });

        }); //end for each job_item in list
}
