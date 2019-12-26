var express = require('express');
const { prisma } = require('./prisma/generated/prisma-client')
var graphqlHTTP = require('express-graphql');
var {
    buildSchema
} = require('graphql');

var schema = buildSchema(`

type Link {
  id: ID!
  description: String!
  url: String!
}

type Query {
  info: String!
  feed: [Link!]!
hello: String!,

  users: [User!]!
  user(id: ID!): User
}

type Mutation {
	post(url: String!, description: String!): Link!
  createUser(name: String!): User!
}

type User {
  id: ID!
  name: String!
}
  
`);

const resolvers = {

    hello: () => 'Hello world!',
    user: (id) => {
        console.log(id.id)
        if (id.id == 4) {
            return {
                id: 4
            }
        } else {
            return {
                id: 10
            }
        }
    },

    info: () => 'This is the API of a Hackernews Clone',

	feed: (root, context, info) => {
      return context.prisma.links();
    },
	
    // 3
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    },
 post: (args, context, info) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
		context: { prisma },
        graphiql: true,
    }));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
