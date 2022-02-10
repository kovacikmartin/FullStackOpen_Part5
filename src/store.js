import { createStore, combineReducers, applyMiddleware } from 'redux'
import blogReducer from './reducers/blogReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({

    blog: blogReducer,
    user: userReducer,
    notification: notificationReducer
})

const store = createStore(

    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store