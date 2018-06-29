//---------------- jQuery Ajax calls used in the following promises

let currencyAjax = (currencyCode) => {
  return $.ajax({
    url: "/currency",
    type: 'GET',
    data: {
      cc: `${currencyCode}`
    }
  });
}

let countryInfoAjax = (alpha2Code) => {
  return $.ajax({
    url: "/dos",
    type: 'GET',
    data: {
      tag: alpha2Code
    }
  });
}




//------------------ Promises that provide data for use in => index.js

// ------ Currency promise
let currencyAjaxPromise = (currencyCode) => {
  return new Promise((resolve) => {
    resolve(currencyAjax(currencyCode));
  });
}

// Sample currency data object returned
/*
{
  "success": true,
  "terms": "https://currencylayer.com/terms",
  "privacy": "https://currencylayer.com/privacy",
  "timestamp": 1530274747,
  "source": "USD",
  "quotes": {
  "USDAFN": 72.59999
  }
*/

// -------- Country info promise
let countryInfoPromise = (alpha2Code) => {
  return new Promise((resolve) => {
    resolve(countryInfoAjax(alpha2Code));
  });
}

// Sample data object returned
/*
{
  "destination_description": "....",
  "entry_exit_requirements": "....",
  "last_update_date": "....",
  "safety_and_security": "....",
  "travel_embassyAndConsulate": "...."
}
*/