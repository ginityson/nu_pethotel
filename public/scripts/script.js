console.log('script.js sourced');

var myApp = angular.module( 'myApp', ['ui.bootstrap'] );

//controller set up for "$scope" of what will be controlled by angular in index.html
myApp.controller( 'petController', [ '$scope', '$http', function( $scope, $http ){
  //define the array allThePets
$scope.allThePets = [];
  //'Add' button clicked now input expressions of the ng-model tags are passed into petObjectToSend
  $scope.addPetRecord = function(){
    console.log('addPetRecord clicked');

    event.preventDefault();
    //define object petObjectToSend and takes values from the input expressions
    var petObjectToSend ={
      name: $scope.pet_name,//here must match the ng-model="pet_name"
      type: $scope.pet_type,
      age: $scope.pet_age,
      image: $scope.pet_image

    };//end of object petObjectToSend, continute to POST below
    console.log('petObjectToSend' + petObjectToSend.name);
    //call to send or POST the info of objectToSend via the url route of /petPost
    $http({
      method: 'POST',
      url: '/petPost',
      data: petObjectToSend
    });//end of $http call

        $scope.pet_name='';//clears the input
        $scope.pet_type='';//clears the input
        $scope.pet_age='';//clears the input
        $scope.pet_image='';//clears the input
  };//end of addPetRecord function go serverside to app.js and post /petPost path

  //'show pets' button clicked now GET method via url path of /getPetRecords initiated
  $scope.getPetRecords = function(){
    $http({
      method: 'GET',
      url: '/getPetRecords',
    }).then( function( response ){
      //here the ask for info from database happens and the array allThePets is equated to response.data on serverside
      $scope.allThePets = response.data;
      console.log( $scope.allThePets );
    },//end .then
    function myError( response ){
      console.log( response.statusText );
    }//end the myError
  );//close the .then
};//end of getPetRecords function

//removePet button clicked and removePet function initiated with index as parameter or arguent
$scope.removePet = function(index){
  var petToRemove = $scope.allThePets[index];
  //here it is saying in NG to take the array allThePets and loop through it looking for index and removing it from the dom
  $scope.allThePets.splice(index, 1);
  console.log('petToRemove._id' + petToRemove._id);
  var petId = {id: petToRemove._id};
  $http({
    method: 'DELETE',
    url: '/removePet',
    data: petId
  });//end of $http
};//end of removePet

}]);//end of petController controller

myApp.controller('TabController', function ($scope, $window) {
  $scope.tabs = [
    { title: 'Home', content: 'partials/home.html'},
    { title:'Add Pet', content: 'partials/addPet.html'},
    { title:'See Pets', content: 'partials/seePets.html'}
  ];
});
