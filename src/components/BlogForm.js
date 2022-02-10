import React from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const BlogForm = ({ visibility }) => {

    const dispatch = useDispatch()

    const addNewBlog = async (event) => {

        event.preventDefault()

        try{

            visibility.current.toggleVisibility()

            const newBlog = {

                title: event.target.title.value,
                author: event.target.author.value,
                url: event.target.url.value
            }

            dispatch(addBlog(newBlog))
            dispatch(showNotification(`Blog ${newBlog.title} by ${newBlog.author} was added`))
        }
        catch(exception){

            dispatch(showNotification('Sorry, there was an error while adding the blog'))
        }
    }

    return(

        <form onSubmit={addNewBlog} id='blogForm'>
            title: <input id='title' name='title' /><br/>
            author: <input id='author' name='author' /><br/>
            url: <input id='url' name='url'/><br/><br/>
            <button id='createButton' type='submit'>Create</button>
        </form>
    )
}

export default BlogForm