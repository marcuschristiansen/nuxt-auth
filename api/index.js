const express = require('express')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')

require('dotenv').config()

const router = express.Router()

const User = require('../models/user')

const app = express()
router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    req.res = res 
    res.req = req
    next()
})

// router.use('/graphql', (req, res) => {
//     console.log('Stored Data!', req.body.data)
//     res.status(200).json({ message: 'Success!' })
// })

router.use(
    '/graphql', 
    graphqlHttp({
        schema: buildSchema(`
            type User {
                _id: ID!
                name: String!
                email: String!
                password: String!
            }

            input UserInput {
                name: String!
                email: String!
                password: String!
            }

            type RootQuery {
                users: [User!]!
            }

            type RootMutation {
                createUser(userInput: UserInput): User
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
        rootValue: {
            users: () => {
                return User.find()
                    .then(users => {
                        return users.map(user => {
                            return { ...user._doc, _id: user.id } // same as 
                        })
                    })
                    .catch((err) => {
                        throw err
                    })
            },
            createUser: (args) => {
                const user = new User({
                    name: args.userInput.name,
                    email: args.userInput.email,
                    password: args.userInput.password
                })
                return user.save()
                    .then((result) => {
                        return { ...result._doc, _id: user.id }
                    })
                    .catch(err => {
                        console.log(err)
                        throw err
                    })
            }
        },
        graphiql: true
    })
)

  mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0-wrzrp.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true`)
    .then(() => {

    })
    .catch(err => console.log(err))

module.exports = {
    path: '/api',
    handler: router
}