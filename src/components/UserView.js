import React from 'react'

const User = ({ user }) => {

    if(!user){
        return null
    }

    return(

        <div>
            <h2>{user.username}</h2>
            <div>
                <h3>added blogs</h3>
                <ul>
                    {user.blogs.map(blog =>
                        <li key={blog.id}>
                            {blog.title}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default User