const {
  mongoose
} = require('./../db/mongoose-connect');

let Schema = mongoose.Schema;

let countrySchema = new Schema({
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

let Country = mongoose.model('Country', countrySchema);

module.exports = {
  Country
}