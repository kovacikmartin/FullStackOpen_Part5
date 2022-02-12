import React from 'react'
import { useDispatch } from 'react-redux'
import { setUser, loginUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { showNotification } from '../reducers/notificationReducer'

const LoginForm = () => {

    const dispatch = useDispatch()

    const login = async (event) => {

        event.preventDefault()

        try{

            const username = event.target.username.value
            const password = event.target.password.value

            const credentials = { username, password }
            const loginAction = await dispatch(loginUser(credentials))
            const user = loginAction.user

            blogService.setToken(user.token)
            dispatch(setUser(user))
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
        }
        catch(exception){
            dispatch(showNotification('Wrong credentials'))
        }
    }

    return(

        <form onSubmit={login}>
            <div className='row mb-3'>
                <label htmlFor='username' className='col-form-label'>Username</label>
                <div className='col-sm-4'>
                    <input id='loginFormUsername' name='username' type='text' className='form-control' />
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor='password' className='col-form-label'>Password</label>
                <div className='col-sm-4'>
                    <input id='loginFormPassword' name='password' type='password' className='form-control' />
                </div>
            </div>
            <button className='btn btn-info' id='loginFormLogin' type='submit'>Log in</button>
        </form>
    )
}

export default LoginForm