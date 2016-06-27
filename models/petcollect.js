var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var petcollectSchema = new Schema({
    name: String,
    type: String,
    age: String,
    image: String
});//end of petcollectSchema


// first param is the collection name
// second param is the schema created above
// Reminder: mongo/mongoose will lowercase and pluralize
var Petcollect = mongoose.model('petcollects', petcollectSchema);

module.exports = Petcollect;
