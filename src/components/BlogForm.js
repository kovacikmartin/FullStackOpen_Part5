import React from 'react'

const BlogForm = ({submitHandle, titleHandle, authorHandle, urlHandle, title, author, url}) => {

    return(
        <form onSubmit={submitHandle}>
            title: <input value={title} onChange={titleHandle}/><br/>
            author: <input value={author} onChange={authorHandle}/><br/>
            url: <input value={url} onChange={urlHandle}/><br/>
            <button type='submit'>Create</button>
        </form>
    )
}

export default BlogForm