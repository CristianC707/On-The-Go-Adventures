// Api Keys
var googleApi = "AIzaSyB3Bki2vXaNQSPf7QpnYstYXwZs0yc3Fdo";
var openTripApi = "5ae2e3f221c38a28845f05b6f54e41bdb094bc3a2bf1800695ea6765";

//Button Selector
var searchBtn = document.getElementById("search-destination");
var checkBtn = document.getElementById("restaurants-checkbox");

var lat;
var lng;

var msg = document.querySelector('.msg');
var checkboxMsg = document.querySelector('.checkbox-msg');


$( function() {
  var previousSearch = [];
  $( "#tags" ).autocomplete({
    source: previousSearch
  });
} );

$(document).ready(function(){
  $('.collapsible').collapsible();
});


//function to get the search value that the user inputted
function getSearchValue(event) {
  event.preventDefault();
  var searchValue = document.querySelector("#input").value.trim();

  if(searchValue === '') {
    msg.classList.add('.msg')
    msg.innerHTML = 'Please enter destination*'
    setTimeout(() => msg.remove(), 3000);
  }

  getGeoLocation(searchValue);
  getLocalStorage(searchValue);
  
}

// Function to store the location search value in localstorage and display back to user
function getLocalStorage(searchValue) {
  //Localstorage -- created an array to store all the input values in
  var locationArray = [];
  localStorage.setItem("location", JSON.stringify(searchValue));
  locationArray.push(JSON.parse(localStorage.getItem("location")));

  // for (let i = 0; i < cityArray.length; i++) {

  // }
  return;
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
        if(checkboxes[i].checked) {
          category.push(checkboxes[i].value);
          var categories = category.toString();
        } else if (checkboxes[i].checked === false) {
          checkboxMsg.classList.add('.checkbox-msg')
          checkboxMsg.innerHTML = 'Please check a box*'
          setTimeout(() => checkboxMsg.remove(), 3000);
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
      //Pass the data to getRandomPlaces function in order to get randomized places
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

  //iterates over all the data and pushes the data to seperate arrays depending on what type of property it is
  for (let i = 0; i < data.features.length; i++) {
    var propertyType = data.features[i].properties.kinds;
    if (propertyType.includes("restaurants", "fast_food")) {
      restaurants.push(data.features[i]);
    } 
     if (propertyType.includes("bars")) {
      bars.push(data.features[i]);
    } 
     if (propertyType.includes("museums" || "urban_environment")) {
      museums.push(data.features[i]);
    } 
     if (propertyType.includes("beaches")) {
      beaches.push(data.features[i]);
    } 
     if (propertyType.includes("architecture")) {
      architecture.push(data.features[i]);
    } 
     if (propertyType.includes("accomodations")) {
      accomodations.push(data.features[i]);
    } 
     if (propertyType.includes("amusement")) {
      amusement.push(data.features[i]);
    } 
    if (propertyType.includes("historic")) {
      historic.push(data.features[i]);
    } 
    if (propertyType.includes("geological_formations" || "natural_springs" || "nature_reserves" || "water")) {
      nature.push(data.features[i]);
    } 
     if (propertyType.includes("religion")) {
      religion.push(data.features[i]);
    } 
     if (propertyType.includes("sport")) {
      sports.push(data.features[i]);
    } 
     if (propertyType.includes("shop")) {
      shops.push(data.features[i]);
    } 
     if (propertyType.includes("nightclubs" || "hookah" || "alcohol" || "casino")) {
      nightActivities.push(data.features[i]);
    } 
     if (propertyType.includes("transport")) {
      transport.push(data.features[i]);
    } 
     if (propertyType.includes("cinemas")) {
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

  console.log(barIndexed);
  displayPlaces(restaurantIndexed, barIndexed, museumIndexed, beachIndexed, architectureIndexed,
    accomodationIndexed, amusementIndexed, historicIndexed, natureIndexed, religionIndexed, sportsIndexed, shopsIndexed,
    nightActivitiesIndexed, transportIndexed, cinemasIndexed);
}

// Function to display the lists that were selected through the checkboxes
function displayPlaces(restaurantIndexed, barIndexed, museumIndexed, beachIndexed, architectureIndexed,
  accomodationIndexed, amusementIndexed, historicIndexed, natureIndexed, religionIndexed, sportsIndexed, shopsIndexed,
  nightActivitiesIndexed, transportIndexed, cinemasIndexed) {
  // Select and display the lists
  var placesDisplay = document.querySelector("#places-display");
  placesDisplay.removeAttribute("hidden");

  //// Create Restaurant list
    var restaurantDivEl = document.querySelector(".restaurant-list");
    var restaurantUlEl = document.createElement("ul");
    for (let i = 0; i < restaurantIndexed.length; i++) {
      var restaurantLiEl = document.createElement("li");
      restaurantLiEl.textContent = restaurantIndexed[i].properties.name;
      restaurantUlEl.append(restaurantLiEl);
    }
    restaurantDivEl.append(restaurantUlEl);

  //// Create bar list

  var barDivEl = document.querySelector(".bar-list");
  var barUlEl = document.createElement("ul");
  for (let i = 0; i < barIndexed.length; i++) {
    var barLiEl = document.createElement("li");
    barLiEl.textContent = barIndexed[i].properties.name;
    barUlEl.append(barLiEl);
  }
  barDivEl.append(barUlEl);


  //// Create museum list

  var museumDivEl = document.querySelector(".museum-list");
  var museumUlEl = document.createElement("ul");
  for (let i = 0; i < museumIndexed.length; i++) {
    var museumLiEl = document.createElement("li");
    museumLiEl.textContent = museumIndexed[i].properties.name;
    museumUlEl.append(museumLiEl);
  }
  museumDivEl.append(museumUlEl);


  //// Create Beach List

  var beachDivEl = document.querySelector(".beach-list");
  var beachUlEl = document.createElement("ul");
  for (let i = 0; i < beachIndexed.length; i++) {
    var beachLiEl = document.createElement("li");
    beachLiEl.textContent = beachIndexed[i].properties.name;
    beachUlEl.append(beachLiEl);
  }
  beachDivEl.append(beachUlEl);
  return;


  //// Create Architecture list
  var architectureDivEl = document.querySelector(".architecture-list");
  var architectureUlEl = document.createElement("ul");
  for (let i = 0; i < architectureIndexed.length; i++) {
    var architectureLiEl = document.createElement("li");
    architectureLiEl.textContent = architectureIndexed[i].properties.name;
    architectureUlEl.append(architectureLiEl);
  }
  architectureDivEl.append(architectureUlEl);

  //// Create accomodations list
  var accomodationDivEl = document.querySelector(".accomodation-list");
  var accomodationUlEl = document.createElement("ul");
  for (let i = 0; i < accomodationIndexed.length; i++) {
    var accomodationLiEl = document.createElement("li");
    accomodationLiEl.textContent = accomodationIndexed[i].properties.name;
    accomodationUlEl.append(accomodationLiEl);
  }
  accomodationDivEl.append(accomodationUlEl);

  //// Create amusement list
  var amusementDivEl = document.querySelector(".amusement-list");
  var amusementUlEl = document.createElement("ul");
  for (let i = 0; i < amusementIndexed.length; i++) {
    var amusementLiEl = document.createElement("li");
    amusementLiEl.textContent = amusementIndexed[i].properties.name;
    amusementUlEl.append(amusementLiEl);
  }
  amusementDivEl.append(amusementUlEl);

  //// Create historic list
  var historicDivEl = document.querySelector(".historic-list");
  var historicUlEl = document.createElement("ul");
  for (let i = 0; i < historicIndexed.length; i++) {
    var historicLiEl = document.createElement("li");
    historicLiEl.textContent = historicIndexed[i].properties.name;
    historicUlEl.append(historicLiEl);
  }
  historicDivEl.append(historicUlEl);

  //// Create Nature list
  var natureDivEl = document.querySelector(".nature-list");
  var natureUlEl = document.createElement("ul");
  for (let i = 0; i < natureIndexed.length; i++) {
    var natureLiEl = document.createElement("li");
    natureLiEl.textContent = natureIndexed[i].properties.name;
    natureUlEl.append(natureLiEl);
  }
  natureDivEl.append(natureUlEl);

  //// Create Religion list
  var religionDivEl = document.querySelector(".religion-list");
  var religionUlEl = document.createElement("ul");
  for (let i = 0; i < religionIndexed.length; i++) {
    var religionLiEl = document.createElement("li");
    religionLiEl.textContent = religionIndexed[i].properties.name;
    religionUlEl.append(religionLiEl);
  }
  religionDivEl.append(religionUlEl);

  //// Create Sports list
  var sportsDivEl = document.querySelector(".sports-list");
  var sportsUlEl = document.createElement("ul");
  for (let i = 0; i < sportsIndexed.length; i++) {
    var sportsLiEl = document.createElement("li");
    sportsLiEl.textContent = sportsIndexed[i].properties.name;
    sportsUlEl.append(sportsLiEl);
  }
  sportsDivEl.append(sportsUlEl);

  //// Create Shops List
  var shopsDivEl = document.querySelector(".shops-list");
  var shopsUlEl = document.createElement("ul");
  for (let i = 0; i < shopsIndexed.length; i++) {
    var shopsLiEl = document.createElement("li");
    shopsLiEl.textContent = shopsIndexed[i].properties.name;
    shopsUlEl.append(shopsLiEl);
  }
  shopsDivEl.append(shopsUlEl);

  //// Create Night Lift list
  var nightActivitiesDivEl = document.querySelector(".nightActivities-list");
  var nightActivitiesUlEl = document.createElement("ul");
  for (let i = 0; i < nightActivitiesIndexed.length; i++) {
    var nightActivitiesLiEl = document.createElement("li");
    nightActivitiesLiEl.textContent = nightActivitiesIndexed[i].properties.name;
    nightActivitiesUlEl.append(nightActivitiesLiEl);
  }
  nightActivitiesDivEl.append(nightActivitiesUlEl);

  //// Create transport list
  var transportDivEl = document.querySelector(".transport-list");
  var transportUlEl = document.createElement("ul");
  for (let i = 0; i < transportIndexed.length; i++) {
    var transportLiEl = document.createElement("li");
    transportLiEl.textContent = transportIndexed[i].properties.name;
    transportUlEl.append(transportLiEl);
  }
  transportDivEl.append(transportUlEl);

  //// Create cinemas list
  var cinemasDivEl = document.querySelector(".cinemas-list");
  var cinemasUlEl = document.createElement("ul");
  for (let i = 0; i < cinemasIndexed.length; i++) {
    var cinemasLiEl = document.createElement("li");
    cinemasLiEl.textContent = cinemasIndexed[i].properties.name;
    cinemasUlEl.append(cinemasLiEl);
  }
  cinemasDivEl.append(cinemasUlEl);
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

