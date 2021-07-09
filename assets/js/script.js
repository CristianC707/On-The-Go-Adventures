// Api Keys
var googleApi = "AIzaSyB3Bki2vXaNQSPf7QpnYstYXwZs0yc3Fdo";
var openTripApi = "5ae2e3f221c38a28845f05b6f54e41bdb094bc3a2bf1800695ea6765";

//Button Selector
var searchBtn = document.getElementById("search-destination");
var checkBtn = document.getElementById("restaurants-checkbox");

var lat;
var lng;

var restaurantIndexed = [];
var barIndexed = [];
var museumIndexed = [];
var beachIndexed = [];
var architectureIndexed = [];
var accomodationIndexed = [];
var amusementIndexed = [];
var historicIndexed = [];
var natureIndexed = [];
var religionIndexed = [];
var sportsIndexed = [];
var shopsIndexed = [];
var nightActivitiesIndexed = [];
var transportIndexed = [];
var cinemasIndexed = [];

//function to get the search value that the user inputted
function getSearchValue(event) {
  event.preventDefault();
  var searchValue = document.querySelector("#input").value.trim();
  getGeoLocation(searchValue);
}

//function to get the long and lat from the location inputted in the search field
function getGeoLocation(searchValue) {
  var queryUrl =
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    searchValue +
    "&key=" +
    googleApi;

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
      var checkboxes = document.getElementsByName("checkbox");
      var category = [];
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          category.push(checkboxes[i].value);
          var categories = category.toString();
        }
      }
      console.log(categories);
      getPlaces(lat, lng, categories);
    });
}

//Function to display the places to the user in a 10 mile radius of the location
function getPlaces(lat, lng, categories) {
  var queryUrl =
    "https://api.opentripmap.com/0.1/en/places/radius?radius=16093.4&lon=" +
    lng +
    "&lat=" +
    lat +
    "&kinds=" +
    categories +
    "&limit=50&apikey=" +
    openTripApi;

  fetch(queryUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      //Pass the data to getRandPlaces function in order to get randomized places
      getRandomPlaces(data);
    });
}





// Function to get random places based on what checkboxes are checked --- these places are limited to 5 places at random for each array
function getRandomPlaces(data) {
  //local arrays to store total amount of of said places
  var restaurants = [];
  var bars = [];
  var museums = [];
  var beaches = [];
  var architecture = [];
  var accomodations = [];
  var amusement = [];
  var historic = [];
  var nature = [];
  var religion = [];
  var sports = [];
  var shops = [];
  var nightActivities = [];
  var transport = [];
  var cinemas = [];

  //iterates over all the data and pushes the data to seperate arrays depending on what type of property it is
  for (let i = 0; i < data.features.length; i++) {
    var propertyType = data.features[i].properties.kinds;
    if (propertyType.includes("restaurants", "fast_food")) {
      restaurants.push(data.features[i]);
    } else if (propertyType.includes("bars")) {
      bars.push(data.features[i]);
    } else if (propertyType.includes("museums" || "urban_environment")) {
      museums.push(data.features[i]);
    } else if (propertyType.includes("beaches")) {
      beaches.push(data.features[i]);
    } else if (propertyType.includes("architecture")) {
      architecture.push(data.features[i]);
    } else if (propertyType.includes("accomodations")) {
      accomodations.push(data.features[i]);
    } else if (propertyType.includes("amusement")) {
      amusement.push(data.features[i]);
    } else if (propertyType.includes("historic")) {
      historic.push(data.features[i]);
    } else if (propertyType.includes("geological_formations" || "natural_springs" || "nature_reserves" || "water")) {
      nature.push(data.features[i]);
    } else if (propertyType.includes("religion")) {
      religion.push(data.features[i]);
    } else if (propertyType.includes("sport")) {
      sports.push(data.features[i]);
    } else if (propertyType.includes("shop")) {
      shops.push(data.features[i]);
    } else if (propertyType.includes("nightclubs" || "hookah" || "alcohol" || "casino")) {
      nightActivities.push(data.features[i]);
    } else if (propertyType.includes("transport")) {
      transport.push(data.features[i]);
    } else if (propertyType.includes("cinemas")) {
      cinemas.push(data.features[i]);
    }
  }

  //Get 5 values from the arrays in order to display them ---- these arrays are global variables
  for (let i = 0; i < 5; i++) {
    var index = restaurants[Math.floor(Math.random() * restaurants.length)];
    restaurantIndexed.push(index);
  }
  for (let i = 0; i < 5; i++) {
    var index = bars[Math.floor(Math.random() * bars.length)];
    barIndexed.push(index);
  }
  for (let i = 0; i < 5; i++) {
    var index = museums[Math.floor(Math.random() * museums.length)];
    museumIndexed.push(index);
  }
  for (let i = 0; i < 5; i++) {
    var index = beaches[Math.floor(Math.random() * beaches.length)];
    beachIndexed.push(index);
  }
  for (let i = 0; i < 5; i++) {
    var index = architecture[Math.floor(Math.random() * architecture.length)];
    architectureIndexed.push(index);
  }
  for (let i = 0; i < 5; i++) {
    var index = accomodations[Math.floor(Math.random() * accomodations.length)];
    accomodationIndexed.push(index);
  }
  for (let i = 0; i < 5; i++) {
    var index = amusement[Math.floor(Math.random() * amusement.length)];
    amusementIndexed.push(index);
  }
  for (let i = 0; i < 5; i++) {
    var index = historic[Math.floor(Math.random() * historic.length)];
    historicIndexed.push(index);
  }
  for (let i = 0; i < 5; i++) {
    var index = nature[Math.floor(Math.random() * nature.length)];
    natureIndexed.push(index);
  }
  for (let i = 0; i < 5; i++) {
    var index = religion[Math.floor(Math.random() * religion.length)];
    religionIndexed.push(index);
  }
  for (let i = 0; i < 5; i++) {
    var index = sports[Math.floor(Math.random() * sports.length)];
    sportsIndexed.push(index);
  }
  for (let i = 0; i < 5; i++) {
    var index = shops[Math.floor(Math.random() * shops.length)];
    shopsIndexed.push(index);
  }
  for (let i = 0; i < 5; i++) {
    var index = nightActivities[Math.floor(Math.random() * nightActivities.length)];
    nightActivitiesIndexed.push(index);
  }
  for (let i = 0; i < 5; i++) {
    var index = transport[Math.floor(Math.random() * transport.length)];
    transportIndexed.push(index);
  }
  for (let i = 0; i < 5; i++) {
    var index = cinemas[Math.floor(Math.random() * cinemas.length)];
    cinemasIndexed.push(index);
  }

  console.log(restaurantIndexed);
  console.log(barIndexed);
  console.log(museumIndexed);
  console.log(beachIndexed);
  console.log(architectureIndexed);
  console.log(accomodationIndexed);
  console.log(amusementIndexed);
  console.log(historicIndexed);
  console.log(natureIndexed);
  console.log(religionIndexed);
  console.log(sportsIndexed);
  console.log(shopsIndexed);
  console.log(nightActivitiesIndexed);
  console.log(transportIndexed);
  console.log(cinemasIndexed);

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
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".slider");
  var options = document.querySelectorAll(".img").src;
  var instances = M.Slider.init(elems, options);
});

//Eventlistner on the searchbutton
searchBtn.addEventListener("click", getSearchValue);

//TODO:
//cards popping up on the side
//create actual cards
//tie to button click

