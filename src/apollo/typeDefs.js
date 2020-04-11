const { gql } = require('apollo-server-express');

const typeDefs = gql`
  
  ########################################
  # All Special Graphql Types

  type Query {
    self: String
  }

  type Subscription{
      #project(id:ID): Project
      #labourPlanGroup(id:ID): LabourPlanGroup
      #activity(id:ID!): Activity
  }

  type Mutation {
    
    #TODO
    hellowWorld(name: String!): DefaultMutationResponse
    
  }
  #########################################

  #########
  # ENUMS #
  #########
  enum I_AM_ENUM {
    YES
    NO
    MAYBE_SO
  }

  #########
  # TYPES #
  #########

  type SomeTypeOfObject {
    memberName: String
    requiredMember: Int!
  }

  ##########
  # INPUTS #
  ##########

  input MyFavoriteInput {
    name: String!
    code: Int!
    isDank: Boolean!
  }
  
  ##############
  # INTERFACES #
  ##############

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  ######################
  # MUTATION RESPONSES #
  ######################

  type DefaultMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    someParameterHere: String
  }

`
module.exports = typeDefs
