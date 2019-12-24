var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
    buildSchema
} = require('graphql');

// 1
let links = [{
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL'
    }
]
let idCount = links.length;
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
    // 2
    feed: () => links,
    // 3
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    },
    post: (args) => {

        const link = {
            id: `link-${idCount++}`,
            description: args.description,
            url: args.url,
        }
        links.push(link)
        return link
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true,
    }));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
