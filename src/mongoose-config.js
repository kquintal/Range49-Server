const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = process.env.DB_CONNECT;
// console.log(url)
if(!url){
  console.log("Set DB_CONNECT env variable!")
}
const devMode = process.env.IGNORE_SSL_VALIDATION === 'true'
if(devMode){
  console.log("Launching without SSLValidation")
}
mongoose.connect(url, { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, sslValidate: !devMode});
mongoose.connection.once('open', () => console.log(`Connected to mongo DB.`));
