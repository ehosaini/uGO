require('dotenv').config();

const express = require('express');
const axios = require('axios');
const {
  Country
} = require('./models/country');


app = express();

// GET Countries API enpoint
app.get('/', (req, res) => {
  let projection = `Name Alpha2Code Alpha3Code Latitude Longitude
  CurrencyCode CurrencyName CurrencySymbol`;

  Country.find(null, projection).then((countries) => {
    res.send(countries);
  }).catch((e) => res.send());

});

// GET dollar exchange rate for a specific country
app.get('/currency/:cc', (req, res) => {
  let currencyCode = req.params.cc;
  let currencyLayerAPI = 'http://apilayer.net/api/live?access_key=' +
    `${process.env.CURRENCY_API_KEY}&currencies=${currencyCode}`;

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