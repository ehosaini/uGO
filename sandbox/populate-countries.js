// const mongoose = require('../db/mongoose-connect');
const mongoose = require('mongoose');
// console.log(mongoose)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/uGoApp');

const _ = require('lodash');

// load the JSON file
var data = require('./countries-info');
var countryInfo = data.Response;


var Schema = mongoose.Schema;

// console.log(mongoose)
// console.log(Schema)
var countrySchema = new Schema({
  Name: String,
  Alpha2Code: String,
  Alpha3Code: String,
  NativeName: String,
  Region: String,
  SubRegion: String,
  Latitude: String,
  Longitude: String,
  Area: Number,
  NumericCode: Number,
  NativeLanguage: String,
  CurrencyCode: String,
  CurrencyName: String,
  CurrencySymbol: String,
  Flag: String,
  FlagPng: String
});


var Country = mongoose.model('Country', countrySchema);

// Populate db with country info
var populateDB = new Promise((resolve, reject) => {
  _.forEach(countryInfo, (value) => {
    Country.create(value).then().catch((e) => console.log(e));
  });
  resolve('DB was populated successfully.');
});

populateDB.then((res) => {
  return console.log(res)
});
