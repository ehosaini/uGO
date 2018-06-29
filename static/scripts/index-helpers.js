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





//------------------ Promises that provide data for use in => index.js

// Currency promise
let currencyAjaxPromise = (currencyCode) => {
  return new Promise((resolve) => {
    resolve(currencyAjax(currencyCode));
  });
}

// Sample currency data returned
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