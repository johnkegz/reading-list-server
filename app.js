const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

//Connect to database
mongoose.connect("mongodb+srv://kegz:BXhY5SPMtXe8Qt2b@cluster0-whx3l.mongodb.net/readers-list?retryWrites=true&w=majority")
mongoose.connection.once('open', ()=>{
    console.log("connected to data base +>>>>>")
})

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(8080, () => {
    console.log("app running on port", 8080)
})