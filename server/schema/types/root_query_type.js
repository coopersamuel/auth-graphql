const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;
const UserType = require('./user_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        // req is auto populated by passport, so we can use the properties on req to determine whether the user is already authenticated or not
        return req.user; // will return undefined if the user hasn't yet been authenticated
      }
    }
  }
});

module.exports = RootQueryType;
