const MongoDataSource = require('apollo-datasource-mongodb').MongoDataSource
const _ = require('lodash')
const messages = require('./Messages')

module.exports = class Users extends MongoDataSource {
  
  async test(name){
    return messages.notImplemented("You gave me this name:"+name)
  }

  async getSIN(userObject){
    return "No SIN for you, thief..."
  }
}