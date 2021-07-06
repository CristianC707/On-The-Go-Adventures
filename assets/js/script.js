main
var destination = document.getElementById('search').value

function search() {
    // Created var to listen when a value is put in the search button
    var searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', function () {
        // Retrieves the value of whats typed into the search bar
        var destination = document.getElementById('search').value
        console.log(destination); 
        getApis(destination);
    })
}
=======
//* Api Keys
var googleMapApi = "AIzaSyB3Bki2vXaNQSPf7QpnYstYXwZs0yc3Fdo"
var openTripApi = "5ae2e3f221c38a28845f05b6f54e41bdb094bc3a2bf1800695ea6765"



