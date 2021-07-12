// Api Keys
var googleApi = "AIzaSyB3Bki2vXaNQSPf7QpnYstYXwZs0yc3Fdo";
var openTripApi = "5ae2e3f221c38a28845f05b6f54e41bdb094bc3a2bf1800695ea6765";

//Button Selector
var searchBtn = document.getElementById("search-destination");
var checkBtn = document.getElementById("restaurants-checkbox");

//Variable Declared
var lat;
var lng;

//Message Selector
var msg = document.querySelector(".msg");


// Function for the places collapsible lists
$(document).ready(function () {
  $(".collapsible").collapsible();
});

//function to get the search value that the user inputted
function getSearchValue(event) {
  event.preventDefault();
  var searchValue = document.querySelector("#input").value.trim();
  if (searchValue === "") {
    msg.classList.add(".msg");
    msg.innerHTML = "Please enter destination*";
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

  var divEl = document.querySelector("#previous-searches");
  var ulEl = document.createElement("ul");
  for (let i = 0; i < locationArray.length; i++) {
    var liEl = document.createElement("li");
    liEl.setAttribute("class", "li-styling");
    var aEl = document.createElement("a");
    aEl.setAttribute("href", "#");
    aEl.textContent = locationArray[i];
    liEl.append(aEl);
    ulEl.append(liEl);
  }
  divEl.append(ulEl);

  aEl.addEventListener("click", function() {
    searchValue = aEl.value;
    searchPreviousDestinations(searchValue);
  })

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
  var architecture = [];
  var accomodations = [];
  var amusement = [];
  var historic = [];
  var religion = [];
  var sports = [];
  var shops = [];
  var nightActivities = [];
  var transport = [];
  var cinemas = [];

  //local arrays to store random 5 places from total amount of said places
  var restaurantIndexed = [];
  var barIndexed = [];
  var museumIndexed = [];
  var architectureIndexed = [];
  var accomodationIndexed = [];
  var amusementIndexed = [];
  var historicIndexed = [];
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
    if (propertyType.includes("religion")) {
      religion.push(data.features[i]);
    }
    if (propertyType.includes("sport")) {
      sports.push(data.features[i]);
    }
    if (propertyType.includes("shop")) {
      shops.push(data.features[i]);
    }
    if (
      propertyType.includes("nightclubs" || "hookah" || "alcohol" || "casino")
    ) {
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
  var r = restaurants.slice();
  for (let i = 0; i < 5; i++) {
    var restaurantsArr = r[Math.floor(Math.random() * r.length)];
    var restaurantsIndex = r.indexOf(restaurantsArr);
    r.splice(restaurantsIndex, 1);
    restaurantIndexed.push(restaurantsArr);
  }

  var b = bars.slice();
  for (let i = 0; i < 5; i++) {
    var barsArr = b[Math.floor(Math.random() * b.length)];
    var barsIndex = b.indexOf(barsArr);
    b.splice(barsIndex, 1);
    barIndexed.push(barsArr);
  }

  var m = museums.slice();
  for (let i = 0; i < 5; i++) {
    var museumsArr = m[Math.floor(Math.random() * m.length)];
    var museumsIndex = m.indexOf(museumsArr);
    m.splice(museumsIndex, 1);
    museumIndexed.push(museumsArr);
  }

  var arc = architecture.slice();
  for (let i = 0; i < 5; i++) {
    var architectureArr = arc[Math.floor(Math.random() * arc.length)];
    var architectureIndex = arc.indexOf(architectureArr);
    arc.splice(architectureIndex, 1);
    architectureIndexed.push(architectureArr);
  }

  var acc = accomodations.slice();
  for (let i = 0; i < 5; i++) {
    var accomodationsArr = acc[Math.floor(Math.random() * acc.length)];
    var accomodationsIndex = acc.indexOf(accomodationsArr);
    acc.splice(accomodationsIndex, 1);
    accomodationIndexed.push(accomodationsArr);
  }

  var amu = amusement.slice();
  for (let i = 0; i < 5; i++) {
    var amusementArr = amu[Math.floor(Math.random() * amu.length)];
    var amusementIndex = amu.indexOf(amusementArr);
    amu.splice(amusementIndex, 1);
    amusementIndexed.push(amusementArr);
  }

  var h = historic.slice();
  for (let i = 0; i < 5; i++) {
    var historicArr = h[Math.floor(Math.random() * h.length)];
    var historicIndex = h.indexOf(historicArr);
    h.splice(historicIndex, 1);
    historicIndexed.push(historicArr);
  }

  var rel = religion.slice();
  for (let i = 0; i < 5; i++) {
    var religionArr = rel[Math.floor(Math.random() * rel.length)];
    var religionIndex = rel.indexOf(religionArr);
    rel.splice(religionIndex, 1);
    religionIndexed.push(religionArr);
  }

  var s = sports.slice();
  for (let i = 0; i < 5; i++) {
    var sportsArr = s[Math.floor(Math.random() * s.length)];
    var sportsIndex = s.indexOf(sportsArr);
    s.splice(sportsIndex, 1);
    sportsIndexed.push(sportsArr);
  }

  var sh = shops.slice();
  for (let i = 0; i < 5; i++) {
    var shopsArr = sh[Math.floor(Math.random() * sh.length)];
    var shopsIndex = sh.indexOf(shopsArr);
    sh.splice(shopsIndex, 1);
    shopsIndexed.push(shopsArr);
  }

  var night = nightActivities.slice();
  for (let i = 0; i < 5; i++) {
    var nightActivitiesArr = night[Math.floor(Math.random() * night.length)];
    var nightActivitiesIndex = night.indexOf(nightActivitiesArr);
    night.splice(nightActivitiesIndex, 1);
    nightActivitiesIndexed.push(nightActivitiesArr);
  }

  var t = transport.slice();
  for (let i = 0; i < 5; i++) {
    var transportArr = t[Math.floor(Math.random() * t.length)];
    var transportIndex = t.indexOf(transportArr);
    t.splice(transportIndex, 1);
    transportIndexed.push(transportArr);
  }

  var c = cinemas.slice();
  for (let i = 0; i < 5; i++) {
    var cinemasArr = c[Math.floor(Math.random() * c.length)];
    var cinemasIndex = c.indexOf(cinemasArr);
    c.splice(cinemasIndex, 1);
    cinemasIndexed.push(cinemasArr);
  }

  displayPlaces(
    restaurantIndexed,
    barIndexed,
    museumIndexed,
    architectureIndexed,
    accomodationIndexed,
    amusementIndexed,
    historicIndexed,
    religionIndexed,
    sportsIndexed,
    shopsIndexed,
    nightActivitiesIndexed,
    transportIndexed,
    cinemasIndexed
  );
}

// Function to display the lists that were selected through the checkboxes
function displayPlaces(
  restaurantIndexed,
  barIndexed,
  museumIndexed,
  architectureIndexed,
  accomodationIndexed,
  amusementIndexed,
  historicIndexed,
  religionIndexed,
  sportsIndexed,
  shopsIndexed,
  nightActivitiesIndexed,
  transportIndexed,
  cinemasIndexed
) {
  // Select and display the lists
  var placesDisplay = document.querySelector("#places-display");
  placesDisplay.removeAttribute("hidden");

  //// Create Restaurant list
  var restaurantDivEl = document.querySelector(".restaurant-list");
  restaurantDivEl.innerHTML = "";
  var restaurantUlEl = document.createElement("ul");
  if (restaurantIndexed.includes(undefined)) {
    var restaurantLiEl = document.createElement("li");
    restaurantLiEl.setAttribute("class", "li-styling");
    restaurantLiEl.textContent = "Nothing to Display Here";
    restaurantUlEl.append(restaurantLiEl);
    restaurantDivEl.append(restaurantUlEl);
  } else {
    for (let i = 0; i < restaurantIndexed.length; i++) {
      var restaurantLiEl = document.createElement("li");
      restaurantLiEl.setAttribute("class", "li-styling");
      if(restaurantIndexed[i].properties.name === "") {
        restaurantLiEl.textContent = "This property has no name";
      } else {
        restaurantLiEl.textContent = restaurantIndexed[i].properties.name;
      }
      restaurantUlEl.append(restaurantLiEl);
    }
    restaurantDivEl.append(restaurantUlEl);
  }

  //// Create bar list
  var barDivEl = document.querySelector(".bar-list");
  barDivEl.innerHTML = "";
  var barUlEl = document.createElement("ul");
  if (barIndexed.includes(undefined)) {
    var barLiEl = document.createElement("li");
    barLiEl.setAttribute("class", "li-styling");
    barLiEl.textContent = "Nothing to Display Here";
    barUlEl.append(barLiEl);
    barDivEl.append(barUlEl);
  } else {
    for (let i = 0; i < barIndexed.length; i++) {
      var barLiEl = document.createElement("li");
      barLiEl.setAttribute("class", "li-styling");
      if(barIndexed[i].properties.name === "") {
        barLiEl.textContent = "This property has no name";
      } else {
        barLiEl.textContent = barIndexed[i].properties.name;
      }
      barUlEl.append(barLiEl);
    }
    barDivEl.append(barUlEl);
  }

  //// Create museum list
  var museumDivEl = document.querySelector(".cultural-list");
  museumDivEl.innerHTML = "";
  var museumUlEl = document.createElement("ul");
  if (museumIndexed.includes(undefined)) {
    var museumLiEl = document.createElement("li");
    museumLiEl.setAttribute("class", "li-styling");
    museumLiEl.textContent = "Nothing to Display Here";
    museumUlEl.append(museumLiEl);
  } else {
    for (let i = 0; i < museumIndexed.length; i++) {
      var museumLiEl = document.createElement("li");
      museumLiEl.setAttribute("class", "li-styling");
      if(museumIndexed[i].properties.name === ""){
        museumLiEl.textContent = "This propety has no name";
      } else {
        museumLiEl.textContent = museumIndexed[i].properties.name;
      }
      museumUlEl.append(museumLiEl);
    }
  }
  museumDivEl.append(museumUlEl);

  //// Create Architecture list
  var architectureDivEl = document.querySelector(".architecture-list");
  architectureDivEl.innerHTML = "";
  var architectureUlEl = document.createElement("ul");
  if (architectureIndexed.includes(undefined)) {
    var architectureLiEl = document.createElement("li");
    architectureLiEl.setAttribute("class", "li-styling");
    architectureLiEl.textContent = "Nothing to Display Here";
    architectureUlEl.append(architectureLiEl);
    architectureDivEl.append(architectureUlEl);
  } else {
    for (let i = 0; i < architectureIndexed.length; i++) {
      var architectureLiEl = document.createElement("li");
      architectureLiEl.setAttribute("class", "li-styling");
      if(architectureIndexed[i].properties.name === "") {
        architectureLiEl.textContent = "This property has no name";
      } else {
        architectureLiEl.textContent = architectureIndexed[i].properties.name;
      }
      architectureUlEl.append(architectureLiEl);
    }
    architectureDivEl.append(architectureUlEl);
  }

  //// Create accomodations list
  var accomodationDivEl = document.querySelector(".accomodations-list");
  accomodationDivEl.innerHTML = "";
  var accomodationUlEl = document.createElement("ul");
  if (accomodationIndexed.includes(undefined)) {
    var accomodationLiEl = document.createElement("li");
    accomodationLiEl.setAttribute("class", "li-styling");
    accomodationLiEl.textContent = "Nothing to Display Here";
    accomodationUlEl.append(accomodationLiEl);
    accomodationDivEl.append(accomodationUlEl);
  } else {
    for (let i = 0; i < accomodationIndexed.length; i++) {
      var accomodationLiEl = document.createElement("li");
      accomodationLiEl.setAttribute("class", "li-styling");
      if(accomodationIndexed[i].properties.name === "") {
        accomodationLiEl.textContent = "This property has no name";
      } else {
        accomodationLiEl.textContent = accomodationIndexed[i].properties.name;
      }
      accomodationUlEl.append(accomodationLiEl);
    }
    accomodationDivEl.append(accomodationUlEl);
  }

  //// Create amusement list
  var amusementDivEl = document.querySelector(".amusement-list");
  amusementDivEl.innerHTML = "";
  var amusementUlEl = document.createElement("ul");
  if (amusementIndexed.includes(undefined)) {
    var amusementLiEl = document.createElement("li");
    amusementLiEl.setAttribute("class", "li-styling");
    amusementLiEl.textContent = "Nothing to Display Here";
    amusementUlEl.append(amusementLiEl);
    amusementDivEl.append(amusementUlEl);
  } else {
    for (let i = 0; i < amusementIndexed.length; i++) {
      var amusementLiEl = document.createElement("li");
      amusementLiEl.setAttribute("class", "li-styling");
      if(amusementIndexed[i].properties.name === "") {
        amusementLiEl.textContent = "This property has no name";
      } else {
        amusementLiEl.textContent = amusementIndexed[i].properties.name;
      }
      amusementUlEl.append(amusementLiEl);
    }
    amusementDivEl.append(amusementUlEl);
  }

  //// Create historic list
  var historicDivEl = document.querySelector(".historic-list");
  historicDivEl.innerHTML = "";
  var historicUlEl = document.createElement("ul");
  if (historicIndexed.includes(undefined)) {
    var historicLiEl = document.createElement("li");
    historicLiEl.setAttribute("class", "li-styling");
    historicLiEl.textContent = "Nothing to Display Here";
    historicUlEl.append(historicLiEl);
    historicDivEl.append(historicUlEl);
  } else {
    for (let i = 0; i < historicIndexed.length; i++) {
      var historicLiEl = document.createElement("li");
      historicLiEl.setAttribute("class", "li-styling");
      if(historicIndexed[i].properties.name === "") {
        historicLiEl.textContent = "This property has no name";
      } else {
        historicLiEl.textContent = historicIndexed[i].properties.name;
      }
      historicUlEl.append(historicLiEl);
    }
    historicDivEl.append(historicUlEl);
  }

  //// Create Religion list
  var religionDivEl = document.querySelector(".religion-list");
  religionDivEl.innerHTML = "";
  var religionUlEl = document.createElement("ul");
  if (religionIndexed.includes(undefined)) {
    var religionLiEl = document.createElement("li");
    religionLiEl.setAttribute("class", "li-styling");
    religionLiEl.textContent = "Nothing to Display Here";
    religionUlEl.append(religionLiEl);
    religionDivEl.append(religionUlEl);
  } else {
    for (let i = 0; i < religionIndexed.length; i++) {
      var religionLiEl = document.createElement("li");
      religionLiEl.setAttribute("class", "li-styling");
      if(religionIndexed[i].properties.name === "") {
        religionLiEl.textContent = "This property has no name";
      } else {
        religionLiEl.textContent = religionIndexed[i].properties.name;
      }
      religionUlEl.append(religionLiEl);
    }
    religionDivEl.append(religionUlEl);
  }

  //// Create Sports list
  var sportsDivEl = document.querySelector(".sports-list");
  sportsDivEl.innerHTML = "";
  var sportsUlEl = document.createElement("ul");
  if (sportsIndexed.includes(undefined)) {
    var sportsLiEl = document.createElement("li");
    sportsLiEl.setAttribute("class", "li-styling");
    sportsLiEl.textContent = "Nothing to Display Here";
    sportsUlEl.append(sportsLiEl);
    sportsDivEl.append(sportsUlEl);
  } else {
    for (let i = 0; i < sportsIndexed.length; i++) {
      var sportsLiEl = document.createElement("li");
      sportsLiEl.setAttribute("class", "li-styling");
      if(sportsIndexed[i].properties.name === "") {
        sportsLiEl.textContent = "This property has no name";
      } else {
        sportsLiEl.textContent = sportsIndexed[i].properties.name;
      }
      sportsUlEl.append(sportsLiEl);
    }
    sportsDivEl.append(sportsUlEl);
  }

  //// Create Shops List
  var shopsDivEl = document.querySelector(".shops-list");
  shopsDivEl.innerHTML = "";
  var shopsUlEl = document.createElement("ul");
  if (shopsIndexed.includes(undefined)) {
    var shopsLiEl = document.createElement("li");
    shopsLiEl.setAttribute("class", "li-styling");
    shopsLiEl.textContent = "Nothing to Display Here";
    shopsUlEl.append(shopsLiEl);
    shopsDivEl.append(shopsUlEl);
  } else {
    for (let i = 0; i < shopsIndexed.length; i++) {
      var shopsLiEl = document.createElement("li");
      shopsLiEl.setAttribute("class", "li-styling");
      if(shopsIndexed[i].properties.name === "") {
        shopsLiEl.textContent = "This property has no name";
      } else {
        shopsLiEl.textContent = shopsIndexed[i].properties.name;
      }
      shopsUlEl.append(shopsLiEl);
    }
    shopsDivEl.append(shopsUlEl);
  }

  //// Create Night Lift list
  var nightActivitiesDivEl = document.querySelector(".nightActivities-list");
  nightActivitiesDivEl.innerHTML = "";
  var nightActivitiesUlEl = document.createElement("ul");
  if (nightActivitiesIndexed.includes(undefined)) {
    var nightActivitiesLiEl = document.createElement("li");
    nightActivitiesLiEl.setAttribute("class", "li-styling");
    nightActivitiesLiEl.textContent = "Nothing to Display Here";
    nightActivitiesUlEl.append(nightActivitiesLiEl);
    nightActivitiesDivEl.append(nightActivitiesUlEl);
  } else {
    for (let i = 0; i < nightActivitiesIndexed.length; i++) {
      var nightActivitiesLiEl = document.createElement("li");
      nightActivitiesLiEl.setAttribute("class", "li-styling");
      if(nightActivitiesIndexed[i].properties.name) {
        nightActivitiesLiEl.textContent = "This property has no name";
      } else {
        nightActivitiesLiEl.textContent = nightActivitiesIndexed[i].properties.name;
      }
      nightActivitiesUlEl.append(nightActivitiesLiEl);
    }
    nightActivitiesDivEl.append(nightActivitiesUlEl);
  }

  //// Create transport list
  var transportDivEl = document.querySelector(".transport-list");
  transportDivEl.innerHTML = "";
  var transportUlEl = document.createElement("ul");
  if (transportIndexed.includes(undefined, "")) {
    var transportLiEl = document.createElement("li");
    transportLiEl.setAttribute("class", "li-styling");
    transportLiEl.textContent = "Nothing to Display Here";
    transportUlEl.append(transportLiEl);
    transportDivEl.append(transportUlEl);
  } else {
    for (let i = 0; i < transportIndexed.length; i++) {
      var transportLiEl = document.createElement("li");
      transportLiEl.setAttribute("class", "li-styling");
      if(transportIndexed[i].properties.name === "") {
        transportLiEl.textContent = "This property has no name";
      } else {
        transportLiEl.textContent = transportIndexed[i].properties.name;
      }  
      transportUlEl.append(transportLiEl);
    }
    transportDivEl.append(transportUlEl);
  }

  //// Create cinemas list
  var cinemasDivEl = document.querySelector(".movie-list");
  cinemasDivEl.innerHTML = "";
  var cinemasUlEl = document.createElement("ul");
  if (cinemasIndexed.includes(undefined)) {
    var cinemasLiEl = document.createElement("li");
    cinemasLiEl.setAttribute("class", "li-styling");
    cinemasLiEl.textContent = "Nothing to Display Here";
    cinemasUlEl.append(cinemasLiEl);
    cinemasDivEl.append(cinemasUlEl);
  } else {
    for (let i = 0; i < cinemasIndexed.length; i++) {
      var cinemasLiEl = document.createElement("li");
      cinemasLiEl.setAttribute("class", "li-styling");
      if(cinemasIndexed[i].properties.name === "") {
        cinemasLiEl.textContent = "This property has no name";
      } else {
        cinemasLiEl.textContent = cinemasIndexed[i].properties.name;
      }
      cinemasUlEl.append(cinemasLiEl);
    }
    cinemasDivEl.append(cinemasUlEl);
  }
}

//Create the google map with the lat and lng from getGeolocation()
function initMap(searchValue, lat, lng) {
  const myLatLng = { lat, lng };
  console.log(myLatLng);
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
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
