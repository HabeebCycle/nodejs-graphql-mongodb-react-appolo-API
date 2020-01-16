const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();

//Allow cross-origin requests
app.use(cors());

//Connect to the mongodb database

const uri = "mongodb+srv://habeebcycle:secret101@graph-ql-xihwd.mongodb.net/node-graphql";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', (err) => {
    if(err) console.log(err);
    console.log('connected to database');
});


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000');
})