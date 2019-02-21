const express = require('express')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')

const router = express.Router()

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
            type RootQuery {
                users: [String!]!
            }

            type RootMutation {
                createUser(email: String): String
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
        rootValue: {
            users: () => {
                return ['Marcus', 'Meghnaaz', 'Vincent']
            },
            createUser: (args) => {
                const userEmail = args.email
                return userEmail
            }
        },
        graphiql: true
    })
)

module.exports = {
    path: '/api',
    handler: router
}