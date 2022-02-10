import blogService from '../services/blogs'

export const initializeBlog = () => {

    return async dispatch => {

        const blog = await blogService.getAll()

        dispatch({

            type: 'INIT',
            blog: blog
        })
    }
}

export const deleteBlog = (blog) => {

    return async dispatch => {

        await blogService.remove(blog)

        dispatch({

            type: 'REMOVE',
            removedBlog: blog
        })
    }
}

export const addBlog = (blog) => {

    return async dispatch => {

        const addedBlog = await blogService.insert(blog)

        dispatch({

            type: 'ADD',
            addedBlog: addedBlog
        })
    }
}

const blogReducer = (state = [], action) => {

    switch(action.type){

        case 'INIT': {

            return action.blog
        }

        case 'REMOVE': {

            return state.filter(blog => blog.id !== action.removedBlog.id)
        }

        case 'ADD': {

            return state.concat(action.addedBlog)
        }

        default:
            return state
    }
}

export default blogReducer