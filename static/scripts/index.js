var map;

function initMap() {
  map = new google.maps.Map($('#map')[0], {
    center: {
      lat: 51.5074,
      lng: 0.1278
    },
    zoom: 3
  });
}



$(document).ready(function() {
  // DOM elements selections
  var goButton = $("button[name='go-button']");
  var countriesList = $("select[name='country-list']");

  // update input value when user selects a new country
  var countryObject = {};

  countriesList.change(function() {
    var selectedCountry = $("select[name='country-list'] option:selected");

    if (selectedCountry.hasClass('country')) {
      countryObject = selectedCountry.val();
    } else {
      countryObject = {};
    }
  });


  goButton.on('click', function(e) {
    if (Object.keys(countryObject).length == 0) {
      alert("Please select a country.");
    }
  });
});