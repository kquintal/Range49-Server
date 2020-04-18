
// // External Dependancies
// // const mongoose = require('mongoose');
// // const mongooseHistory = require('mongoose-history')
// // const mongooseTimestamps = require('mongoose-timestamp');


// const schema = new mongoose.Schema(
//   {
//     email: { type: String, unique: true, required: true },
//     isSuperUser: { type: Boolean, default: false },
//     isAnonymous: { type: Boolean, default: false },
//     roles: { type: [String], default: [""] },
//     firstName: { type: String, default: "" },
//     lastName: { type: String, default: "" },
//   }
// )
// // 
// schema.virtual('fullName').get(function () {
//   const nameParts = []
//   if (this.firstName) {
//     nameParts.push(this.firstName)
//   }
//   if (this.lastName) {
//     nameParts.push(this.lastName)
//   }
//   return nameParts.join(" ")
// })

// schema.plugin(mongooseHistory);
// schema.plugin(mongooseTimestamps);

// module.exports = mongoose.model('User', schema)
