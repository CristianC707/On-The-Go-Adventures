//* Api Keys
var googleMapApi = "AIzaSyB3Bki2vXaNQSPf7QpnYstYXwZs0yc3Fdo";
var openTripApi = "5ae2e3f221c38a28845f05b6f54e41bdb094bc3a2bf1800695ea6765";

//Button Selector
var searchBtn = document.getElementById('search-destination');

//function to get the search value
function getSearchValue() {
    var searchValue = document.getElementById('search').value;
    console.log(searchValue); 
    getApis(searchValue);
}

function getApis(searchValue) {

}

searchBtn.addEventListener("click", getSearchValue);


 