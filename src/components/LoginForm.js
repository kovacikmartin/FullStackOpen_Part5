import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ loginHandle, usernameHandle, passwordHandle, username, password }) => {

    return(

        <form onSubmit={loginHandle}>
            username: <input value={username} type='text' onChange={usernameHandle}/><br/>
            password: <input value={password} type='password' onChange={passwordHandle}/><br/><br/>
            <button type='submit'>Log in</button>
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