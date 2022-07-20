import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import BlogsRouter from "./apis/blogs/index.js"
import { badRequestHandler, notFoundHandler, unauthorizedHandler, genericServerErrorHandler } from "./errorHandlers.js"

const server = express()

const port = 3001

const loggerMiddleware = (req, res, next) =>{
    console.log(`Request method: ${req.method} -- Request URL: ${req.url} -- ${new Date()}`)
    console.log("Req body: ", req.body)
    next()
}

server.use(cors()) 
server.use(loggerMiddleware) 
server.use(express.json())

server.use("/blogs", loggerMiddleware, BlogsRouter)

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(genericServerErrorHandler)

server.listen(port, () => {
    console.table(listEndpoints(server))
    console.log("Server is running on port: ", port)
  })
  