import loginService from '../services/login'

const initialState = null

export const setUser = (user) => {

    return async dispatch => {

        dispatch({

            type: 'SET',
            user: user
        })
    }
}

export const loginUser = (user) => {

    return async dispatch => {

        const authenticatedUser = await loginService.login(user)

        return dispatch({

            type: 'LOGIN',
            user: authenticatedUser
        })
    }
}

export const logoutUser = () => {

    return dispatch => {

        setUser(null)

        dispatch({

            type: 'LOGOUT'
        })
    }
}

const userReducer = (state = initialState, action) => {

    switch(action.type){

        case 'SET':{

            return action.user
        }

        case 'LOGIN': {

            return action.user
        }

        case 'LOGOUT': {

            return initialState
        }

        default:
            return state
    }
}

export default userReducer