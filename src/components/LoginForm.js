import React from 'react'

const LoginForm = ({loginHandle, usernameHandle, passwordHandle, username, password}) => {

    return(

        <form onSubmit={loginHandle}>
            username: <input value={username} type='text' onChange={usernameHandle}/><br/>
            password: <input value={password} type='password' onChange={passwordHandle}/><br/><br/>
            <button type='submit'>Log in</button>
        </form>
    )
}

export default LoginForm