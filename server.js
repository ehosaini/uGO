const express = require('express');
const axios = require('axios');
const {
  Country
} = require('./models/country');


app = express();

// GET Countries API enpoint
app.get('/', (req, res) => {
  var projection = `Name Alpha2Code Alpha3Code Latitude Longitude NumericCode \
  NativeLanguage CurrencyCode CurrencyName CurrencySymbol`;

  Country.find(null, projection).then((countries) => {
    res.send(countries);
  }).catch((e) => res.send());

});

// GET dollar exchange rate for a specific country
app.get('/currency/:cc', (req, res) => {
  var currencyCode = req.params.cc;
  var currencyLayerAPI = `http://apilayer.net/api/live?access_key=0c321626c19f4a3090cb9fae87ad676c&currencies=${currencyCode}`;

  axios.get(currencyLayerAPI).then((result) => {
    if (result.data.success === false) {
      return res.status(404).send({
        error: 'sorry, server could not find the exchange rate.'
      });
    }

    res.send(result.data);
  }).catch((e) => console.log(e));

});




app.listen(3000, () => {
  console.log('Sever up at 3000');
});
