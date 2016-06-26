var express = require('express');
//get the express app
var app = express();
var bodyParser = require('body-parser');//parse json
app.use(bodyParser.json());
var path = require('path');
var mongoose = require('mongoose');
//connect to the database - petspetspets is the database name
mongoose.connect('localhost:27017/petspetspets');

var ourSchema = new  mongoose.Schema({
  pet_name: String,
  pet_type: String,
  pet_age: String,
  pet_image: String
});

var ourModel = mongoose.model( 'ourModel', ourSchema );

//base url
app.get('/', function(req, res) {
  res.sendFile(path.resolve('views/index.html'));
  console.log('base url');
});

app.get( '/getPetRecords', function( req, res ){
  ourModel.find()
  .then( function( data ){
    res.send( data );
  });//end of the .then
});//end of /getPetRecords function

//spin up server
app.listen(3000, 'localhost', function(req, res){
  console.log('listen 3000');
});//edn of the server

// post call comming from script.js $http post call conveying petObjectToSend data known here as req.body....
app.post( '/petPost', function( req, res ){
  console.log( 'req.body: ' + req.body.pet_name );
  // retrieved the req.body

  // putting req.body.... into an object to be saved in the db
    var petRecordToAdd={
      pet_name: req.body.pet_name,
      pet_type: req.body.pet_type,
      pet_age: req.body.pet_age,
      pet_image: req.body.pet_image
    };

    // MAGIC happening here! newPetRecord is really the mongoose.model method with parameter of petRecordToAdd
    var newPetRecord=ourModel( petRecordToAdd );
    //here newPetRecord is saved presumably to the container ? in the database chicken
    newPetRecord.save();
    console.log('new record from app.post: ' + newPetRecord);
    });//end of /petPost pet info is now abiding in the database

  //static folder makes 'sourcing' files easy by making them all be on the same level of public
  app.use(express.static('public'));
