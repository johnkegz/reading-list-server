const graphql = require("graphql");
const _ = require("lodash")

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const books = [
    {name: "Name of wind", genre: "Fantasy", id:"1", authorId: "1"},
    {name: "Meet them", genre: "Fantasy", id:"2", authorId: "2"},
    {name: "the long earth", genre: "Sci-fi", id:"3", authorId: "3"},
    {name: "Ages in the middle", genre: "Sci-fi", id:"4", authorId: "3"},
    {name: "Boomb", genre: "Drama", id:"5", authorId: "2"},
    {name: "Boomb", genre: "Drama", id:"6", authorId: "2"},
    {name: "great in good", genre: "Drama", id:"7", authorId: "3"},
]

const authors = [
    {name: "kalyango John", age: 22, id:"1"},
    {name: "Okllo Peter", age: 100, id:"2"},
    {name: "Rambo zee", age: 2, id:"3"},
]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
         id: {type: GraphQLID },
         name: {type: GraphQLString},
         genre: {type: GraphQLString },
         author: {
             type: AuthorType,
             resolve(parent, args){
                console.log("parent +++++++", parent)
                return _.find(author, {id: parent.authorId})
             }
         }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
         id: {type: GraphQLID },
         name: {type: GraphQLString},
         age: {type: GraphQLInt },
         books: {
             type: new GraphQLList(BookType),
             resolve(parent, args){
                return _.filter(books, {authorId: parent.id})
             }
         }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RouteQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args){
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
            }
        }
})

module.exports = new GraphQLSchema({
     query: RootQuery
})
