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
      countryObject['countryName'] = selectedCountry.text();
      countryObject['alpha2Code'] = selectedCountry.val();
    } else {
      countryObject['countryName'] = null;
      countryObject['alpha2Code'] = null;
    }
  });


  goButton.on('click', function(e) {
    if (!countryObject['countryName'] || !countryObject['alpha2Code']) {
      alert("Please select a county.");
    }
  });
});