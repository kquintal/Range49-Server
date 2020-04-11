const ml = require('./utils/mongoose-loader')
const _ = require('lodash')
// const assert = require('assert')
const dataSources = require('../src/data-sources')
const resolvers = require('../src/apollo/resolvers')

//Include Chai
const assert = require('chai').assert
var expect = require('chai').expect
var should = require('chai').should()

/*
* Chai runs tests on "_test" files in order to which they appear in the directory (hence the naming convention 0_... to 6_...)
*/
before(async () =>{
  await ml.load()
}) 

after(async() => {
  await ml.unload()
}) 