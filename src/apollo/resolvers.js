const { GraphQLDateTime } = require('graphql-iso-date')
const { withFilter, PubSub } = require('graphql-subscriptions');
const _ = require('lodash')

//Subscriptions support
const pubsub = new PubSub();

const LISTING_UPDATE = "LISTING_UPDATE"
const TRANSFER_UPDATE = "TRANSFER_UPDATE"

const resolvers = {
  Subscription: {
    listing: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([LISTING_UPDATE]),
        (listing, filter) => {
          //TODO: Check for all the parameters
          return (_.isEmpty(filter) || (listing && listing.length == 1 && listing.id == filter.id))
        },
      ),
      resolve: (listing) => {
        return listing
      },
    },
    transfer: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([TRANSFER_UPDATE]),
        (transfer, filter) => {
          //TODO: Check for all the parameters
          return (_.isEmpty(filter) || (transfer && transfer.length == 1 && transfer.id == filter.id))
        },
      ),
      resolve: (listing) => {
        return listing
      },
    },
  },
  Query: {
    self: async (_source, _args, { currentUser }) => {
      return {
        email: "TODO, not yet implemented",
        firstName: "Stop searching for yourself",
        lastName: "Weirdo....."
      }
    },
    user: async (_source, _args, { currentUser }) => {
      return {
        firstName: "Curious, are we?",
        lastName: "Now that just plain rude....",
        email: "Hey! Private info here!"
      }
    },

    firearms: async (_source, _args, { currentUser }) => {
      return [{
        name: "Barret M82A1",
        caliber: ".50",
        manufacturer: "Barret",
        model: "M82A1",
      }]
    },
    listings: async (_source, _args, { currentUser }) => {
      return {
        items: [
          { listingPrice: 35000.50 },
          { listingPrice: 250.50 },
          { listingPrice: 150.50 },
        ],
        currentPage: 1,
        totalPages: 1,
      }
    },
  },
  Mutation: {

    createFirearm: async (_, args, { dataSources, currentUser }) => {
      // FirearmInput
      return {
        code: 501,
        success: true,
        message: "Hold your horses, good things take time..."
      }
    },
    createListing: async (_, args, { dataSources, currentUser }) => {
      // ListingInput
      pubsub.publish(LISTING_UPDATE, { listingTitle: "Subscribed-returned listing", listingPrice: 9001 })

      return {
        code: 501,
        success: true,
        message: "Hold your horses, good things take time..."
      }
    },
    addPALToUser: async (_, args, { dataSources, currentUser }) => {
      // PALAdditionInput
      return {
        code: 501,
        success: true,
        message: "Hold your horses, good things take time..."
      }
    },

    createUser: async (_, args, { dataSources, currentUser }) => {
      // UserInput
      return {
        code: 501,
        success: true,
        message: "Hold your horses, good things take time..."
      }
    },
  },

  ////////////////////
  // Custom members //
  // User: {
  //   sinNumber: async (userObject, _, { dataSources, currentUser }) => {
  //     return "123-456-789"
  //   },
  // },
}

module.exports = resolvers