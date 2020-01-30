const graphql = require("graphql");
const _ = require("lodash")

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

const books = [
    {name: "Name of wind", genre: "Fantasy", id:"1"},
    {name: "Meet them", genre: "Fantasy", id:"2"},
    {name: "the long earth", genre: "Sci-fi", id:"3"},
]

const author = [
    {name: "kalyango John", age: 22, id:"1"},
    {name: "Okllo Peter", age: 100, id:"2"},
    {name: "Rambo zee", age: 2, id:"3"},
]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
         id: {type: GraphQLID },
         name: {type: GraphQLString},
         genre: {type: GraphQLString }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
         id: {type: GraphQLID },
         name: {type: GraphQLString},
         age: {type: GraphQLInt }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RouteQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args){
                //code to get data from db/other source
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(author, {id: args.id});
            }
            }
        }
})

module.exports = new GraphQLSchema({
     query: RootQuery
})
