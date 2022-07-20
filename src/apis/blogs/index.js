import fs from "fs"
import uniqid from "uniqid"
import express from "express"
import createHttpError from "http-errors"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import { checkBlogSchema, checkValidationResult } from "./validation.js"

const BlogsRouter = express.Router()
const BlogsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "blogPosts.json")

const getBlogs = () => JSON.parse(fs.readFileSync(BlogsJSONPath))
const writeBlogs = blogsArray => fs.writeFileSync(BlogsJSONPath, JSON.stringify(blogsArray))

BlogsRouter.post('/', checkBlogSchema, checkValidationResult, (req, res, next) =>{
    try{
        const newBlog = {...req.body, createdAt: new Date(), id: uniqid()}
        const blogs = getBlogs()

        blogs.push(newBlog)

        writeBlogs(blogs)

        res.status(201).send({id: newBlog.id})
    } catch(error){
        next(error)
    }
})

BlogsRouter.get("/", (req, res, next) => {
    try{
        const blogs = getBlogs()
        //if (req.query && req.query.category){
            // const filteredBlogs = blogs.filter(blog => blog.category === req.query.category)
            // res.send(filteredBlogs)
        //}
        res.send(blogs)
    }
 catch (error){
    next(error)
}} )

BlogsRouter.get("/:blogPostsId",(req, res, next) => {
    try{
        const blogs = getBlogs()

        const foundBlog = blogs.find(blog => blog.id === req.params.blogPostsId)
        if (foundBlog){
            res.send(foundBlog)
        }else {
            next(createHttpError(404, `Blog with id ${req.params.blogsId} not found!`))
        }

    } catch(error) {
        next(error)
    }
})

BlogsRouter.put("/:blogPostsId", (req, res, next) => {
    try {
      const blogs = getBlogs()
      console.log(blogs)
      const index = blogs.findIndex(blog => blog.id === req.params.blogPostsId)
      if (index !== -1) {
        const oldBlog = blogs[index]
  
        const updatedBlog = { ...oldBlog, ...req.body, updatedAt: new Date() }
  
        blogs[index] = updatedBlog
  
        writeBlogs(blogs)
  
        res.send(updatedBlog)
      } else {
        next(createHttpError(404, `Blog with id ${req.params.blogsId} not found!`))
        // res.status(404).send()
      }
    } catch (error) {
      next(error)
    }
  })
  
  BlogsRouter.delete("/:blogPostsId", (req, res, next) => {
    try {
      const blogs = getBlogs()
  
      const remainingBlogs = blogs.filter(blog => blog.id !== req.params.blogPostsId)
  
      writeBlogs(remainingBlogs)
  
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  })
  
  export default BlogsRouter