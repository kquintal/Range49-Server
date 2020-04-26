const { gql } = require('apollo-server-express');

const typeDefs = gql`
  
  ########################################
  # All Special Graphql Types

  directive @deprecated(
    reason: String = "No longer supported"
  ) on FIELD_DEFINITION | ENUM_VALUE

  scalar DateTime

  type Query {
    self: User @deprecated(reason:"Will probably be removing...")
    user(id:ID!): User
    listings(input:ListingQueryInput): ListingQueryResult
    firearms(id:ID): [Firearm]
  }

  type Subscription{
      listing(id:ID): Listing @deprecated(reason:"Will probably make this id required...")
      transfer(id:ID): Transfer @deprecated(reason:"Will probably make this id required...")
  }

  type Mutation {
    
    createUser(input:UserInput!) : UserMutationResponse
    createFirearm(input:FirearmInput!) : FirearmMutationResponse
    createListing(input:ListingInput!) : ListingMutationResponse
    addPALToUser(input:PALAdditionInput!) : UserMutationResponse
    
  }

  #########################################

  #########
  # TYPES #
  #########

  type User {
    email: String!
    address: String
    firstName: String
    lastName: String
    phoneNumber: String
    userType: USER_TYPE
    # ---
    palRef: Pal
    listingRefs: [String]
    registrationCertificateRefs: [RegistrationCertificate]
    transferRefs: [Transfer]
  }

  type Pal {
      backPhotoUrl: String
      frontPhotoUrl: String
      dateExpired: DateTime
      fullName: String
      registrationNumber: String
      provinceOfIssue: PROVINCE
    }

  type RegistrationCertificate {
    dateIssued: DateTime
    firearmIdentificationNumber: String
    registrationCertificateNumber: String
    serialNumber: String
  }

  type Firearm {
    name: String
    caliber: String
    manufacturer: String
    model: String
    actionType: FIREARM_ACTION
    restriction: FIREARM_RESTRICTION
    type: FIREARM_TYPE
    utilization: FIREARM_UTILIZATION
  }

  type Listing {
    listingTitle: String
    listingPrice: Float
    datePosted: DateTime
    dateLastEdited: DateTime
    productPicturesURLs: [String]
    status: LISTING_STATUS
    # --
    firearmRef: Firearm
    purchaseRef: Purchase
    sellerRef: User
    certificateRef: RegistrationCertificate
    transferRef: Transfer
  }

  type Transaction {
    amount: Float
    dateReceived: DateTime
    # --
    buyerRef: User
  }

  type Purchase {
    commission: Float
    paid: Float
    shippingCost: Float
    taxes: Float
    total: Float
    # --
    transactionRefs: [Transaction]
  }

  type Transfer {
    att: String
    dateCreated: DateTime
    dateSold: DateTime
    priceSold: Float
    rcmpReferenceCode: String
    transferStatus: TRANSFER_STATUS
    # --
    labelRef: Label
    sellerRef: User
    buyerRef: User
  }

  type Label {
    carrier: String
    dateCreated: DateTime
    dateDelivered: DateTime
    dateShipped: DateTime
    shippingNumber: String
  }

  type ListingQueryResult {
    items: [Listing]
    currentPage: Int
    totalPages: Int
  }

  #########
  # ENUMS #
  #########
  enum USER_TYPE {
    BUSINESS
    INDIVIDUAL
  }

  enum FIREARM_ACTION {
    AUTOMATIC
    LEVER
    PUMP
    SEMI_AUTOMATIC
  }

  enum FIREARM_TYPE {
    PISTOL
    RIFLE
    SHOTGUN
  }

  enum FIREARM_UTILIZATION {
    COLLECTORS
    HUNTING
    TACTICAL
  }

  enum LISTING_STATUS {
    PENDING
    POSTED
    SOLD
  }

  enum PROVINCE {
    AB
    BC
    MB
    NB
    NL
    NS
    NT
    NU
    ON
    PE
    QC
    SK
    YT
  }

  enum FIREARM_RESTRICTION {
    NON_RESTRICTED
    PROHIBITED
    RESTRICTED
  }

  enum TRANSFER_STATUS {
    COMPLETED
    LABEL_SENT
    PAID
    RCMP_ATT_ACQUIRED
    RCMP_REFERENCE_ACQUIRED
    RECEIVED
    SHIPPED
  }

  ##########
  # INPUTS #
  ##########

  input ListingQueryInput {
    id:ID, 
    firearmId:ID, 
    firearmType: FIREARM_TYPE,
    firearmAction: FIREARM_ACTION,
    firearmRestriction: FIREARM_RESTRICTION,
    firearmUtilization: FIREARM_UTILIZATION,
    itemsPerPage: Int = 25
  }

  input UserInput {
    email: String!
    address: String!
    firstName: String!
    lastName: String!
    phoneNumber: String
    userType: USER_TYPE!
  }
  
  input PALAdditionInput {
    userRef: ID!
    backPhotoUrl: String!
    frontPhotoUrl: String!
    dateExpired: DateTime!
    fullName: String!
    registrationNumber: String!
    provinceOfIssue: PROVINCE!
  }

  input FirearmInput {
    name: String
    caliber: String!
    manufacturer: String
    model: String!
    actionType: FIREARM_ACTION!
    restriction: FIREARM_RESTRICTION!
    type: FIREARM_TYPE!
    utilization: FIREARM_UTILIZATION!
  }

  input ListingInput {
    listingTitle: String!
    listingPrice: Float!
    productPicturesURLs: [String]
    # --
    firearmRef: ID!
  }
  

  ######################
  # MUTATION RESPONSES #
  ######################

  type UserMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  type FirearmMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    firearm: Firearm
  }

  type ListingMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    listing: Listing
  }

  ##############
  # INTERFACES #
  ##############

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

`
module.exports = typeDefs
