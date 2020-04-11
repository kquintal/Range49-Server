require('dotenv').config();
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

module.exports.load = async function() {
  const url = process.env.DB_CONNECT;
  // console.log(url)
  if(!url){
    // console.log("Set DB_CONNECT env variable!")
  }
  await mongoose.connect(url, { useCreateIndex: true,  useFindAndModify: false, useNewUrlParser: true, sslValidate:false });
  mongoose.connection.once('open', () => console.log(`Connected to mongo DB.`));  
}

module.exports.unload = async function(){
  return await mongoose.disconnect();
}
