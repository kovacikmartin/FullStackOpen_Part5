const initialState = ''
let timeout = null

export const showNotification = (message) => {

    if(timeout !== null){

        clearTimeout(timeout)
    }

    return async dispatch => {

        dispatch({

            type: 'SHOW',
            message: message
        })

        timeout = setTimeout(() => dispatch(hideNotification()), 5 * 1000)
    }
}

export const hideNotification = () => {

    return{

        type: 'HIDE'
    }
}

const notificationReducer = (state = initialState, action) => {

    switch(action.type){

        case 'SHOW': {

            return action.message
        }

        case 'HIDE': {

            return initialState
        }

        default:
            return state
    }
}

export default notificationReducer