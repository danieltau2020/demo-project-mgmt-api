import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import { graphqlHTTP } from "express-graphql"
import { schema } from "./schema/schema.js"

const port = process.env.PORT || 5001

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose
  .connect(process.env.MONGO_URL, () => {
    console.log("Mongo db connected successfully")
  })
  .catch((err) => {
    console.log("Mongo db connection error", err)
  })

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ),
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    )
  next()
})

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development"
  })
)
