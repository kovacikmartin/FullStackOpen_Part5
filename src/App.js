import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import ToggleBlogDetails from './components/ToggleBlogDetails'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import { initializeBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, logoutUser } from './reducers/userReducer'

const App = () => {

    const dispatch = useDispatch()

    console.log(useSelector(state => state))

    const blogFormRef = useRef()

    const blogs = useSelector(state => state.blog)
    const user = useSelector(state => state.user)
    const notification = useSelector(state => state.notification)

    useEffect(() => {

        dispatch(initializeBlog())
    }, [dispatch])

    useEffect(() => {

        const loggedUserJSON = window.localStorage.getItem('loggedUser')

        if(loggedUserJSON){

            const loggedUser = JSON.parse(loggedUserJSON)

            blogService.setToken(loggedUser.token)
            dispatch(setUser(loggedUser))
        }
    }, [])

    const logoutHandle = () => {

        blogService.setToken(null)
        window.localStorage.removeItem('loggedUser')

        dispatch(logoutUser())
    }

    const blogForm = () => {

        return(

            <Togglable buttonLabel='Create new blog' ref={blogFormRef}>

                <h2>Create new blog</h2>

                <BlogForm visibility={blogFormRef}/>

            </Togglable>
        )
    }

    const loginForm = () => {

        return (

            <Togglable buttonLabel='Log in'>

                <h2>Login to app</h2>

                <LoginForm />
            </Togglable>
        )
    }

    return (

        <div>
            <h2>Blogs</h2>
            {notification === '' ? null : <p>{notification}</p>}

            {user === null ?
                loginForm() :

                <div>
                    <p>{user.username} is logged in <button type='button' onClick={logoutHandle}>Log out</button></p>
                    {blogForm()}<br/>


                    <div>
                        {blogs.map(blog =>

                            <ToggleBlogDetails key={blog.id} buttonLabel='View' postedBy={user.username}>
                                <Blog blog={blog}/>
                            </ToggleBlogDetails>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default App