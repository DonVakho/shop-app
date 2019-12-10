const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const express = require('express')
const http = require('http')
const cors = require('cors')
const schema = require( './schema/schema')
const router = require('./router')

const PORT = process.env.PORT || 4000

const app = express()
const server = http.createServer(app)

app.use(router)
app.use(cors())
app.use('/entrance', graphqlHTTP({
    schema,
    graphiql: true
}));

//connect to database
const uri = "mongodb+srv://user_vakho:123@chatapp-nisch.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('connnected to mongodb');
})

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
