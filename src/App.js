import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import ToggleBlogDetails from './components/ToggleBlogDetails'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

    const [blogs, setBlogs] = useState([])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const [operationMessage, setOperationMessage] = useState('')

    const blogFormRef = useRef()

    useEffect(() => {

        const getBlogs = async () => {

            const response = await blogService.getAll()
            const sortedBlogs = response.sort((a, b) => b.likes - a.likes)

            setBlogs(sortedBlogs)
        }

        getBlogs()
    }, [])

    useEffect(() => {

        const loggedUserJSON = window.localStorage.getItem('loggedUser')

        if(loggedUserJSON){

            const loggedUser = JSON.parse(loggedUserJSON)

            blogService.setToken(loggedUser.token)
            setUser(loggedUser)
        }
    }, [])

    const loginHandle = async (event) => {

        event.preventDefault()

        try{

            const user = await loginService.login({ username, password })

            blogService.setToken(user.token)
            setUser(user)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            setOperationMessage('')
        }
        catch(exception){

            setOperationMessage('Wrong credentials')
            setUsername('')
            setPassword('')
        }

        setTimeout(() => {

            setOperationMessage('')
        }, 4000)

        setUsername('')
        setPassword('')
    }

    const logoutHandle = () => {

        blogService.setToken(null)
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    const addNewBlog = async (newBlog) => {

        try{

            blogFormRef.current.toggleVisibility()
            const addedBlog = await blogService.insert(newBlog)

            setOperationMessage(`Blog ${newBlog.title} by ${newBlog.author} was added`)

            setBlogs(blogs.concat(addedBlog))
        }
        catch(exception){

            setOperationMessage('Sorry, there was an error while adding the blog')
        }

        setTimeout(() => {

            setOperationMessage('')
        }, 4000)
    }

    const deleteBlog = async (blogToDelete) => {

        if(window.confirm(`Remove the blog ${blogToDelete.title} by ${blogToDelete.author} ?`)){

            try{

                await blogService.remove(blogToDelete)

                setOperationMessage('Blog succesfully deleted')

                setBlogs(blogs.filter(blog => blog.title !== blogToDelete.title))
            }
            catch(exception){

                setOperationMessage('Sorry, there was an error while deleting the blog')
            }

            setTimeout(() => {

                setOperationMessage('')
            }, 4000)
        }
    }

    const usernameChange = (event) => setUsername(event.target.value)
    const passwordChange = (event) => setPassword(event.target.value)

    const blogForm = () => {

        return(

            <Togglable buttonLabel='Create new blog' ref={blogFormRef}>

                <h2>Create new blog</h2>

                <BlogForm addBlog={addNewBlog}/>

            </Togglable>
        )
    }

    const loginForm = () => {

        return (

            <Togglable buttonLabel='Log in'>

                <h2>Login to app</h2>

                <LoginForm loginHandle={loginHandle}
                    usernameHandle={usernameChange}
                    passwordHandle={passwordChange}
                    username={username}
                    password={password}
                />
            </Togglable>
        )
    }

    return (

        <div>
            <h2>Blogs</h2>
            {operationMessage === '' ? null: <p>{operationMessage}</p>}

            {user === null ?
                loginForm() :

                <div>
                    <p>{user.username} is logged in <button type='button' onClick={logoutHandle}>Log out</button></p>
                    {blogForm()}<br/>

                    <div>
                        {blogs.map(blog =>

                            <ToggleBlogDetails key={blog.id} buttonLabel='View' postedBy={user.username} deleteBlog={deleteBlog}>
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