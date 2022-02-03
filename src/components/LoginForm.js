import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ loginHandle, usernameHandle, passwordHandle, username, password }) => {

    return(

        <form onSubmit={loginHandle}>
            username: <input id='loginFormUsername' value={username} type='text' onChange={usernameHandle}/><br/>
            password: <input id='loginFormPassword' value={password} type='password' onChange={passwordHandle}/><br/><br/>
            <button id='loginFormLogin' type='submit'>Log in</button>
        </form>
    )
}

LoginForm.propTypes = {

    loginHandle: PropTypes.func.isRequired,
    usernameHandle: PropTypes.func.isRequired,
    passwordHandle: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm