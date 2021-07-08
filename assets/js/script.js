// Api Keys
var googleMapApi = "AIzaSyB3Bki2vXaNQSPf7QpnYstYXwZs0yc3Fdo";
var openTripApi = "5ae2e3f221c38a28845f05b6f54e41bdb094bc3a2bf1800695ea6765";

//Button Selector
var searchBtn = document.getElementById("search-destination");

let map;

//display map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 25.7617, lng: -80.1918 },
    zoom: 10,
  });

   

    //add marker
    //addMarker(getSearchValue);
    //function addMarker(coords) {
      //var marker = new google.maps.Marker({
       //position: coords,
//         map: map,
//     })
//   }
}





//function to get the search value
function getSearchValue() {
    var searchValue = document.getElementById("input").value;
    console.log(searchValue);
}

//autocomplete function
$( function() {
  var previousSearches = [];
  $( "#tags" ).autocomplete({
    source: previousSearches
  });
} );

//image slider activation
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.slider');
    var options = document.querySelectorAll(".img").src;
    var instances = M.Slider.init(elems, options);
});

//TODO: 
//cards popping up on the side
//create actual cards 
//tie to button click
//use opentrip api to list things to do 
//whatever they click from check box is what will pop up



//Eventlistner on the searchbutton
searchBtn.addEventListener("click", getSearchValue);


 


 