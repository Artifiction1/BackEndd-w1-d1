import { checkSchema, validationResult } from "express-validator"
import createHttpError from "http-errors"

const BlogSchema = {
    
      category: {
        in: ["body"],
        isString: {
          errorMessage: "Category is a mandatory field and needs to be a string!",
        },
      },
      title: {
        in: ["body"],
        isString: {
          errorMessage: "Title is a mandatory field and needs to be a string!",
        },
      },
      cover: {
        in: ["body"],
        isString: {
          errorMessage: "Cover is a mandatory field and needs to be a string!",
        },
      },
      readTime: {
        value: {
            in: ["body"],
            isNumber: {
              errorMessage: "Value is a mandatory field and needs to be a number!",
            },
          },
          unit: {
            in: ["body"],
            isString: {
              errorMessage: "Unit is a mandatory field and needs to be a string!",
            },
          },
        
      },
      author: {
        name: {
            in: ["body"],
            isString: {
              errorMessage: "Author name is a mandatory field and needs to be a string!",
            },
          },avatar: {
            in: ["body"],
            isString: {
              errorMessage: "Avatar is a mandatory field and needs to be a string!",
            },
          },
      },
      content: {
        in: ["body"],
        isString: {
          errorMessage: "Content is a mandatory field and needs to be a string!",
        },
      },
      
}

export const checkBlogSchema = checkSchema(BlogSchema)

export const checkValidationResult = (req, res, next) => {
    const errors = validationResult(req)
  
    if (!errors.isEmpty()) {
      next(createHttpError(400, "Validation errors in request body!", { errorsList: errors.array() }))
    } else {
      next()
    }
  }