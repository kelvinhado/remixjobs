var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Job        = require('./remixjob-model');
var scrapper   = require("./remixjob-scrapper");
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/db-remixjob'); // connect to our database


app.get('/scrap', function(req, res) {
  var nbPages = 3;
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
        // var job = new Job();      // create a new instance of the Bear model
        // job.id= req.body.id;  // set the bears name (comes from the request)
        //
        // // save the bear and check for errors
        // job.save(function(err) {
        //     if (err)
        //         res.send(err);
        //
        //     res.json({ message: 'Job created!' });
        // });
    })

    // get all the jobs (accessed at GET http://localhost:9292/api/jobs)
    .get(function(req, res) {
        Job.find(function(err, jobs) {
            if (err)
                res.send(err);

            res.json(jobs);
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
