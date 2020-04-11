const { GraphQLDateTime } = require('graphql-iso-date')

const resolvers = {
  Date: GraphQLDateTime,
  Subscription: {
    // project: {
    //   subscribe: withFilter(
    //     () => pubsub.asyncIterator([PROJECT_UPDATE]),
    //     (project, filter) => {
    //       // If no filter was provided, return the given project. If an id was given, make sure they match
    //       return (_.isEmpty(filter) || (project && project.length == 1 && project.id == filter.id))
    //     },
    //   ),
    //   resolve: (project) => {
    //     return project
    //   },
    // },
    // labourPlanGroup: {
    //   subscribe: withFilter(
    //     () => pubsub.asyncIterator([LPG_UPDATE]),
    //     (LPG, filter) => {
    //       // If no filter was provided, return the given project. If an id was given, make sure they match
    //       return (_.isEmpty(filter) || (LPG && LPG.length == 1 && LPG.id == filter.id))
    //     },
    //   ),
    //   resolve: (labourPlanGroup) => {
    //     return labourPlanGroup 
    //   },
    // },
    // activity: {
    //   subscribe: withFilter(
    //   () => pubsub.asyncIterator([ACTIVITY_UPDATE]),
    //   (activity, filter) => {
    //     return (activity && activity.id == filter.id) //Can only subscribe to a single activity
    //     },
    //   ),
    //   resolve: (activity) => {
    //     return activity
    //   },
    // },
  },
  Query: {
    self: async (_source, _args, {currentUser}) => {
      return {weirdo:"Stop searching for yourself"}
    },
  },
  Mutation: {
    hellowWorld: async (_, args, { dataSources, currentUser }) => {
      return await dataSources.users.test(args.name)
    },
  },

  ////////////////////
  // Custom members //
  User: {
    sinNumber: async (userObject, _, { dataSources, currentUser }) => {
      return await dataSources.users.getSin(userObject)
    },
  },
}

module.exports = resolvers