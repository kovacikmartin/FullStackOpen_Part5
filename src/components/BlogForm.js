import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {

    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')

    const addNewBlog = (event) => {

        event.preventDefault()

        addBlog({

            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogUrl
        })

        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
    }

    const blogTitleChange = (event) => setNewBlogTitle(event.target.value)
    const blogAuthorChange = (event) => setNewBlogAuthor(event.target.value)
    const blogUrlChange = (event) => setNewBlogUrl(event.target.value)

    return(
        <form onSubmit={addNewBlog}>
            title: <input value={newBlogTitle} onChange={blogTitleChange}/><br/>
            author: <input value={newBlogAuthor} onChange={blogAuthorChange}/><br/>
            url: <input value={newBlogUrl} onChange={blogUrlChange}/><br/><br/>
            <button type='submit'>Create</button>
        </form>
    )
}

BlogForm.propTypes = {

    addBlog: PropTypes.func.isRequired
}

export default BlogForm