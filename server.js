require('dotenv').config();

const express = require('express');
var _ = require('lodash');
const axios = require('axios');
const nunjucks = require('nunjucks');
const striptags = require('striptags');
const path = require('path');

const {
  Country
} = require('./models/country');

var env = process.env.NODE_ENV || 'development';

const app = express();

// configure view engine
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
  noCache: true
});

// app.set('views', './views');
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'html');
app.use(express.static('static'));
app.use('/static', express.static('static'));


// ---------------- GET Home page  ----------------------
app.get('/', (req, res) => {
  let projection = `-_id Name Alpha2Code Latitude Longitude
  CurrencyCode CurrencyName CurrencySymbol`;

  Country.find(null, projection).then((countries) => {
    res.render('index', {
      countries
    });
  }).catch((e) => res.send());
});

// ----------  GET Countries API enpoint -----------------
app.get('/countries', (req, res) => {
  let projection = `Name Alpha2Code Alpha3Code Latitude Longitude
  CurrencyCode CurrencyName CurrencySymbol`;

  Country.find(null, projection).then((countries) => {
    res.send(countries);
  }).catch((e) => res.send());
});

// ----------- GET dollar exchange rate for a specific country ---------------
app.get('/currency', (req, res) => {
  let currencyCode = req.query.cc;
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

// ---------- GET country-specific travel info from the State Department API ----------
app.get('/dos', (req, res) => {
  const alpha2Code = req.query.tag;
  const dosCtiAPI = `https://cadataapi.state.gov/api/CountryTravelInformation/${alpha2Code}`;

  axios.get(dosCtiAPI).then((result) => {
    // return console.log(result.data[0]);
    if (!result.status === 200) {
      return res.status(404).send({
        error: 'sorry, did not find country travel information'
      });
    }

    // pick the important values
    const data = result.data[0];
    const pickedData = _.pick(data, ['destination_description', 'entry_exit_requirements',
      'safety_and_security', 'travel_embassyAndConsulate', 'last_update_date'
    ]);

    // strip html tags from returned data
    const strippedData = {};
    _.forIn(pickedData, (value, key) => {
      let strippedValue = striptags(value, ['p', 'a', 'h', 'i', 'ul', 'li', 'b']);
      strippedData[key] = strippedValue;
    });
    res.send(strippedData);

  }).catch((e) => console.log(e));
});


app.listen(3000, () => {
  console.log('Sever is up at 3000');
});