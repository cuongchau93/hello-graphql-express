var express = require('express');
const { prisma } = require('./prisma/generated/prisma-client')
const { importSchema } = require('graphql-import')
const schemaStr = importSchema('./src/schema.graphql')

var graphqlHTTP = require('express-graphql');
var {
    buildSchema
} = require('graphql');


var schema = buildSchema(schemaStr);

const resolvers = require('./src/resolvers');

var app = express();
app.use('/graphql', graphqlHTTP(request => {
	return {
        schema: schema,
        rootValue: resolvers,
		context: {
					  request: request,
					  prisma: prisma,
					},
        graphiql: true
		}
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
