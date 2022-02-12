import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

    return(
        <div>
            <Link to={`/blogs/${blog.id}`} className='text-dark fw-bold fs-5 text-decoration-none'>{blog.title} by {blog.author}</Link>
        </div>
    )
}

export default Blog