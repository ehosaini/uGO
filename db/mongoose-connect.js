const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/uGoApp').then((connection) => {

}).catch((e) => {
  console.log(e);
});

module.exports = {
  mongoose
};