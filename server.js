const express = require('express');

app = express();

app.get('/', (req, res) => {
  res.send('Hello Express!');
})

app.listen(3000, () => {
  console.log('Sever up at 3000');
});
