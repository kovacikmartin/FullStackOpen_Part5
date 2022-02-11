import React from 'react'

const BlogView = ({ blog }) => {

    if(!blog){

        return null
    }

    return(

        <div>
            <h2>{blog.title} by {blog.author}</h2>
            <a href={blog.url}>url</a>
            <p>{blog.likes} likes</p>
            <p>addedy by {blog.user.username}</p>
        </div>
    )
}

export default BlogView