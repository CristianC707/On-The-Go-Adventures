// Api Keys
var googleMapApi = "AIzaSyB3Bki2vXaNQSPf7QpnYstYXwZs0yc3Fdo";
var openTripApi = "5ae2e3f221c38a28845f05b6f54e41bdb094bc3a2bf1800695ea6765";

//Button Selector
var searchBtn = document.getElementById('search-destination');

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}





//function to get the search value
function getSearchValue() {
    var searchValue = document.getElementById("input").value;
    console.log(searchValue);
}




document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.slider');
    var options = document.querySelectorAll(".img").src;
    var instances = M.Slider.init(elems, options);
  });

  //Eventlistner on the searchbutton
searchBtn.addEventListener("click", getSearchValue);


 