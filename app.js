const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(8080, () => {
    console.log("app running on port", 8080)
})