var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Job        = require('./remixjob-model');
var scrapper   = require("./remixjob-scrapper");
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/db-remixjob'); // connect to our database


app.get('/scrap', function(req, res) {
  var nbPages = 2;
  scrapper.scrappRemixJob(nbPages,function(hits){
    res.write("done. " + hits.toString() + " jobs found");
    res.end();
  }); // end scrappRemixJob
}); //end app.get /scrap


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Work in progress.');
    next(); // make sure we go to the next routes and don't stop here
});


router.get('/', function(req, res) {
    res.json({ message: 'welcome to the remix api!' });
});

router.route('/jobs')

    // create a job (accessed at POST http://localhost:9292/api/jobs)
    .post(function(req, res) {
        var job = new Job();      // create a new instance of the Bear model
        job.id= Date.now();
        job.title = req.body.title;
        job.url = req.body.url;
        job.company = req.body.company;
        job.localization.data_workplace_name = req.body.workplace_name;
        job.localization.data_workplace_lat = req.body.workplace_lat;
        job.localization.data_workplace_lng = req.body.workplace_lng;
        job.contract = req.body.contract;
        job.date = Date.now();
        job.tags = (req.body.tags).split(",");

        job.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Job "'+job.title+'" created!' });
        });
    })
    // get all the jobs (accessed at GET http://localhost:9292/api/jobs)
    .get(function(req, res) {

        Job.find(req.query, function(err, jobs) {
            if (err) {
               console.log(err);
               res.send(err);
            }


            res.json(jobs);
        });
});

router.route('/jobs/:job_id')
    // get the job with that id (accessed at GET http://localhost:8080/api/jobs/:job_id)
    // to update a specific job
    .put(function(req, res) {
      Job.findOne({id: req.params.job_id}, function(err, job) {
          if (err)
              res.send(err);
            job.id= Date.now();
            job.title = req.body.title;
            job.url = req.body.url;
            job.company = req.body.company;
            job.localization.data_workplace_name = req.body.workplace_name;
            job.localization.data_workplace_lat = req.body.workplace_lat;
            job.localization.data_workplace_lng = req.body.workplace_lng;
            job.contract = req.body.contract;
            job.date = Date.now();
            job.tags = (req.body.tags).split(",");

            job.save(function(err) {
              if (err)
                     res.send(err);

                 res.json({ success : true,  message: 'job updated successfully!' });
             });
        });

    })
    .get(function(req, res) {
        Job.findOne({id: req.params.job_id}, function(err, job) {
            if (err)
                res.send(err);

            res.json(job);
    });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/v1', router);

// START THE SERVER
// =============================================================================

var port = process.env.PORT || 9292;        // set our port
app.listen(port);
console.log('Magic happens on port ' + port);
