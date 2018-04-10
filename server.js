const express = require('express');
const {
  Country
} = require('./models/country');

app = express();

// GET Countries API enpoint
app.get('/', (req, res) => {
  let projection = `Name Alpha2Code Alpha3Code Latitude Longitude NumericCode \
  NativeLanguage CurrencyCode CurrencyName CurrencySymbol`;

  Country.find(null, projection).then((countries) => {
    res.send(countries);
  });

});

app.listen(3000, () => {
  console.log('Sever up at 3000');
});
