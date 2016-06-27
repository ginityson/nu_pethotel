var express = require('express');
var app = express();//get the express app

var bodyParser = require('body-parser');//parse json
app.use(bodyParser.json());

var path = require('path');//have to have this

var mongoose = require('mongoose');

var Petcollect = require('../models/petcollect');//here we require the model Petcollect

//connect to the database - petspetspets is the database name
mongoose.connect('localhost:27017/petspetspets');

//base url
app.get('/', function(req, res) {
  res.sendFile(path.resolve('views/index.html'));
  console.log('base url');
});

app.get( '/getPetRecords', function( req, res ){
  //go .find the model Petcollect
  Petcollect.find()
  //.then send all the data
  .then( function( data ){
    res.send( data );
  });//end of the .then
});//end of /getPetRecords function

//spin up server
app.listen(3000, 'localhost', function(req, res){
  console.log('listen 3000');
});//end of the server

// post call comming from script.js $http post call conveying petObjectToSend data known here as req.body....
app.post( '/petPost', function( req, res ){
  console.log( 'req.body: ' + req.body.name );
  // retrieved the req.body

  // putting req.body.... into an object to be saved in the db
    var petRecordToAdd= new Petcollect({
      name: req.body.name,
      type: req.body.type,
      age: req.body.age,
      image: req.body.image
    });//end petRecordToAdd
    console.log('petRecordToAdd' + petRecordToAdd);
    // MAGIC happening here! newPetRecord is really the mongoose.model method with parameter of petRecordToAdd
    petRecordToAdd.save();
    console.log('new record from app.post: ' + petRecordToAdd);
    });//end of /petPost pet info is now abiding in the database

    app.post( '/removePet', function (req, res) {

      Petcollect.find()
      //.then send all the data
      .then( function( data ){
        Petcollect.remove(data);
      });//end of the .then




    });//end of /RemovePet
  //static folder makes 'sourcing' files easy by making them all be on the same level of public
  app.use(express.static('public'));
