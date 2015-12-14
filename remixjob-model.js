var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var JobSchema   = new Schema({
    id : Number,
    title : String,
    company : String,
    url: String,
    localization: {
       data_workplace_name: String,
       data_workplace_lat: Number,
       data_workplace_lng: Number
    },
    contract :String,
    date : String,
    tags: Array
});

module.exports = mongoose.model('Job', JobSchema);
