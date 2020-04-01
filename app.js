const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const connectDB = require('./utils/connectDB');
const graphqlSchema = require('./graphql/schema');
const rootResolvers = require('./graphql/resolvers');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: rootResolvers,
  graphiql: false,
}));

connectDB();

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
