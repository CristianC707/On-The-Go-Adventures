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