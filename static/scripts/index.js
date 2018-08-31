// Generate GoogleMap
let map = null;

function initMap() {
  map = new google.maps.Map($('#map')[0], {
    center: {
      lat: 38.9072,
      lng: 77.0369
    },
    zoom: 2
  });
}

let position = null;
let marker = null;

function dropMarker(position) {
  marker = new google.maps.Marker(
    {position, map, animation: google.maps.Animation.DROP}
  );
}

// ------------- Begining jQuery document-ready handler function
$(document).ready(function() {
  // DOM elements selections
  const goButton = $("button[name='go-button']");
  const countriesList = $("select[name='country-list']");
  const convertedCurrency = $('#exchange-rate');
  const entryExit = $('#entry-exit');
  const USembassy = $('#embassy-consulate-info');
  const securityInfo = $('#security-info');
  const selectCountry = $('#select-country');

  // update input value when user selects a new country
  // Sample returned data below
  /*
  {"Name":"Albania","Alpha2Code":"AL","Latitude":"41","Longitude":"20",
  "CurrencyCode":"ALL","CurrencyName":"Albanian lek","CurrencySymbol":"L"}
  */

  let countryObject = {};

  countriesList.change(function() {
    const selectedCountry = $("select[name='country-list'] option:selected");

    if (selectedCountry.hasClass('country')) {
      countryObject = selectedCountry.val();
      countryObject = JSON.parse(countryObject);
    } else {
      countryObject = {};
    }

  });

  // --------- Begining handler function for the Go! button
  goButton.on('click', function(e) {
    if (Object.keys(countryObject).length == 0) {
      alert("Please select a country.");
      return;
    }

    // Let user know that data is being loaded

    const queText = '<div class="text-info mx-auto">\
                      <p>Updating data ....</p>\
                    </div>'
    convertedCurrency.text('');

    // temporarily add Bootstrap classes to center ques
    USembassy.addClass("d-flex align-items-center");
    USembassy.html(queText)
    
    entryExit.addClass("d-flex align-items-center");
    entryExit.html(queText);

    securityInfo.addClass("d-flex align-items-center");
    securityInfo.html(queText);

   

    // Remove marker from previous search  
    if(marker) {
      marker.setMap(null);
    }
    
    // Drop a marker on the map
    const position = {lat: Number(countryObject.Latitude), 
      lng: Number(countryObject.Longitude)};

    // Center & zoom the map on the new marker
    map.setCenter(position);
    map.setZoom(4);

    // Populate currency info
    const cc = countryObject.CurrencyCode;

    currencyAjaxPromise(cc).then((result) => {
      /* convert $100 using the returned exchange rate and
      format result to show the converted currency name */
      const converted = numeral(result.quotes[`USD${cc}`] * 100).format('0,0.00');
      const formatConverted = `${converted} ${countryObject.CurrencyName}`;
      convertedCurrency.text(formatConverted);
    }).catch((e) => {
      convertedCurrency.text('No exchange rate available.');
    });

    // Populate country travel information
    const al = countryObject.Alpha2Code;

    countryInfoPromise(al).then((result) => {
      /* 
        remove the temporary Bootsrap classes that were added 
        in the begining of handler
      */
     
      entryExit.removeClass("d-flex align-items-center");
      USembassy.removeClass("d-flex align-items-center");
      securityInfo.removeClass("d-flex align-items-center");

      entryExit.html(result['entry_exit_requirements']);
      USembassy.html(result['travel_embassyAndConsulate']);
      securityInfo.html(result['safety_and_security']);
    }).catch((error) => {
      console.log(error);
    })
    // Add new marker with half a second delay
    setTimeout(() => dropMarker(position), 500);
    
    selectCountry.css('margin-bottom', '150px');
    
  
  });
  // ----------- end handler function for the GO! button


}); // -------- end of jQuery document-ready handler function