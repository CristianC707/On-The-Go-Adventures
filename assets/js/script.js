// Api Keys
var googleApi = "AIzaSyB3Bki2vXaNQSPf7QpnYstYXwZs0yc3Fdo";
var openTripApi = "5ae2e3f221c38a28845f05b6f54e41bdb094bc3a2bf1800695ea6765";

//Button Selector
var searchBtn = document.getElementById("search-destination");
var checkBtn = document.getElementById("restaurants-checkbox");
var lat;
var lng;

//function to get the search value that the user inputted
function getSearchValue(event) {
  event.preventDefault();
  var searchValue = document.querySelector("#input").value.trim();

  getGeoLocation(searchValue);
}

//function to get the long and lat from the location inputted in the search field
function getGeoLocation(searchValue) {
  var queryUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + searchValue + "&key=" + googleApi;

  fetch(queryUrl)
    .then(function (res) {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      lat = data.results[0].geometry.location.lat;
      lng = data.results[0].geometry.location.lng;
      console.log(lat);
      console.log(lng);
      initMap(searchValue, lat, lng);
      
      //Checks to see if the checkbox is checked and taks the value of the checkbox and passes that as the category to the getPlaces() function
      if(document.querySelector("input[name=checkbox]").checked) {
        var category = document.querySelector("input[name=checkbox]").value;
        console.log(category);
        getPlaces(lat, lng, category);
      }
    });
}


//Function to display the places to the user in a 10 mile radius of the location
function getPlaces(lat, lng, category) {
  
  var queryUrl = "https://api.opentripmap.com/0.1/en/places/radius?radius=16093.4&lon=" + lng + "&lat=" + lat + "&kinds=" + category + "&limit=5&apikey=" + openTripApi;

  fetch(queryUrl) 
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      console.log(data);
  
      //Create the cards here

    })
}

//Create the google map with the lat and lng from getGeolocation()
function initMap(searchValue, lat, lng) {
  const myLatLng = { lat, lng };
  console.log(myLatLng);
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatLng,
  });
  new google.maps.Marker({
    position: myLatLng,
    map,
    title: String(searchValue),
  });
}


//Eventlistener for image slider activation
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.slider');
    var options = document.querySelectorAll(".img").src;
    var instances = M.Slider.init(elems, options);
});

//Eventlistner on the searchbutton
searchBtn.addEventListener("click", getSearchValue);



 //TODO: 
//cards popping up on the side
//create actual cards 
//tie to button click
//use opentrip api to list things to do 
//whatever they click from check box is what will pop up