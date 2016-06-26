console.log('script.js sourced');

var myApp = angular.module( 'myApp', [] );

//controller set up for "$scope" of what will be controlled by angular in index.html
myApp.controller( 'petController', [ '$scope', '$http', function( $scope, $http ){

  //'Add' button clicked now input expressions of the ng-model tags are passed into objectToSend
  $scope.addPetRecord = function(){
    event.preventDefault();
    var petObjectToSend ={
      pet_name: $scope.pet_name,
      pet_type: $scope.pet_type,
      pet_age: $scope.pet_age,
      pet_image: $scope.pet_image

    };//end of object petObjectToSend, continute to POST below
console.log('petObjectToSend');
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
      //here the ask for info from database happens and allThePets is equated to response.data on serverside
      $scope.allThePets = response.data;
      console.log( $scope.allThePets );
    },
    function myError( response ){
      console.log( response.statusText );
    }//end the myError
  );//close the .then
};//end of getPetRecords function

}]);//end of petController controller
