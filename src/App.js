import React, { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import BlogView from './components/BlogView'
import Users from './components/Users'
import User from './components/UserView'
import Togglable from './components/Togglable'
import ToggleBlogDetails from './components/ToggleBlogDetails'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import userService from './services/users'
import { initializeBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, logoutUser } from './reducers/userReducer'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

const App = () => {

    const dispatch = useDispatch()

    const blogFormRef = useRef()

    const blogs = useSelector(state => state.blog)
    const user = useSelector(state => state.user)
    const notification = useSelector(state => state.notification)

    const[allUsers, setAllUsers] = useState([])

    useEffect(() => {

        dispatch(initializeBlog())
    }, [dispatch])

    useEffect(async () => {

        const response = await userService.getAll()
        setAllUsers(response)
    }, [])

    const userMatch = useRouteMatch('/users/:id')
    const userToView = userMatch ? allUsers.find(user => user.id === userMatch.params.id) : null

    const blogMatch = useRouteMatch('/blogs/:id')
    const blogToView = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null

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
                    <div>
                        <Link to='/blogs'>blogs</Link>
                        <Link to='/users'>users</Link>
                        <p>{user.username} is logged in <button type='button' onClick={logoutHandle}>Log out</button></p>
                    </div>

                    <Switch>

                        <Route path='/blogs/:id'>
                            <BlogView blog={blogToView} />
                        </Route>

                        <Route path='/blogs'>
                            {blogForm()}<br/>
                            <div>
                                {blogs.map(blog =>

                                    <ToggleBlogDetails key={blog.id} buttonLabel='View' postedBy={user.username}>
                                        <Blog blog={blog}/>
                                    </ToggleBlogDetails>
                                )}
                            </div>
                        </Route>

                        <Route path='/users/:id'>
                            <User user={userToView} />
                        </Route>

                        <Route path='/users'>
                            <Users users={allUsers}/>
                        </Route>

                    </Switch>
                </div>
            }
        </div>
    )
}

export default App