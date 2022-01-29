import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const [operationMessage, setOperationMessage] = useState('')

  useEffect(() => {

    const getBlogs = async () => {

      const response = await blogService.getAll()
      setBlogs(response)
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

      const user = await loginService.login({username, password})

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

  const createNewBlogHandle = async (event) => {

    event.preventDefault()

    const newBlog = {

      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }

    try{
      
      const addedBlog = await blogService.insert(newBlog)

      setOperationMessage(`Blog ${newBlogTitle} by ${newBlogAuthor} was added`)

      setBlogs(blogs.concat(addedBlog))

      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
    }
    catch(exception){

      setOperationMessage(`Sorry, there was an error while adding the blog`)
    }

    setTimeout(() => {

      setOperationMessage('')
    }, 4000)
  }

  const usernameChange = (event) => setUsername(event.target.value)
  const passwordChange = (event) => setPassword(event.target.value)

  const blogTitleChange = (event) => setNewBlogTitle(event.target.value)
  const blogAuthorChange = (event) => setNewBlogAuthor(event.target.value)
  const blogUrlChange = (event) => setNewBlogUrl(event.target.value)

  if(user === null)
  {
    return (
      
      <div>
        <h2>Login to app</h2>

        {operationMessage === '' ? null: <p>{operationMessage}</p>}

        <LoginForm loginHandle={loginHandle}
                    usernameHandle={usernameChange}
                    passwordHandle={passwordChange}
                    username={username}
                    password={password}/>
      </div>
    )
  }

  return (
    <>
      <div>
        <h2>Blogs</h2>

        {operationMessage === '' ? null: <p>{operationMessage}</p>}

        <p>{`${user.username} is logged in`}</p>
        <button type='button' onClick={logoutHandle}>Log out</button>

        <div>
          <h2>Create new blog</h2>

          <BlogForm submitHandle={createNewBlogHandle}
                    titleHandle={blogTitleChange}
                    authorHandle={blogAuthorChange}
                    urlHandle={blogUrlChange}
                    title={newBlogTitle}
                    author={newBlogAuthor}
                    url={newBlogUrl}/>
        </div>
        <br></br>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  )
  
}

export default App