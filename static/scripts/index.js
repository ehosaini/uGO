// Generate GoogleMap
let map;

function initMap() {
  map = new google.maps.Map($('#map')[0], {
    center: {
      lat: 51.5074,
      lng: 0.1278
    },
    zoom: 3
  });
}

// ------------- Begining jQuery document-ready handler function
$(document).ready(function() {
  // DOM elements selections
  const goButton = $("button[name='go-button']");
  const countriesList = $("select[name='country-list']");
  const convertedCurrency = $('#exchange-rate');
  const entryExit = $('#entry-exit');
  const USembassy = $('#embassy-consulate-info');
  const securityInfo = $('#security-info')

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
  goButton.on('click', function(error) {
    if (Object.keys(countryObject).length == 0) {
      alert("Please select a country.");
      return;
    }

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
      entryExit.html(result['entry_exit_requirements']);
      USembassy.html(result['travel_embassyAndConsulate']);
      securityInfo.html(result['safety_and_security']);
    }).catch((error) => {
      console.log(error);
    })
  });
  // ----------- end handler function for the GO! button


}); // -------- end of jQuery document-ready handler function