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
            <div className='row mb-3'>
                <label htmlFor='title' className='col-form-label'>Title</label>
                <div className='col-sm-4'>
                    <input id='title' name='title' type='text' className='form-control' />
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor='author' className='col-form-label'>Author</label>
                <div className='col-sm-4'>
                    <input id='author' name='author' type='text' className='form-control' />
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor='url' className='col-form-label'>Url</label>
                <div className='col-sm-4'>
                    <input id='url' name='url' type='text' className='form-control' />
                </div>
            </div>
            <button id='createButton' type='submit' className='btn btn-info'>Create</button>
        </form>
    )
}

export default BlogForm