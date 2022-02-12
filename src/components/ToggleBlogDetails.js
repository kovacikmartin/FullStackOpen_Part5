import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const ToggleBlogDetails = (props) => {

    const dispatch = useDispatch()

    const [detailsHidden, setDetailsHidden] = useState(false)
    const [buttonLabel, setButtonLabel] = useState(props.buttonLabel)

    const toggleDetails = () => {

        if(detailsHidden){

            setButtonLabel('View')
        }
        else{

            setButtonLabel('Hide')
        }

        setDetailsHidden(!detailsHidden)
    }

    const expanded = { display: detailsHidden ? 'block' : 'none', margin: '20px 0px 0px' }

    const blog = useSelector(({ blog }) => blog.filter(blog => blog.id === props.children.props.blog.id))

    const remove = async (blogToDelete) => {

        if(window.confirm(`Remove the blog ${blogToDelete.title} by ${blogToDelete.author} ?`)){

            try{

                await dispatch(deleteBlog(blogToDelete))
                dispatch(showNotification('Blog succesfully deleted'))
            }
            catch(exception){
                dispatch(showNotification('Sorry, there was an error while deleting the blog'))
            }
        }
    }

    return(

        <div className='blogTogglable'>
            {props.children}<button type='button' onClick={toggleDetails} className='btn btn-info btn-sm'>{buttonLabel}</button>

            <div style={expanded} className='expanded'>
                {blog.map(blog => (
                    <div key={blog.id}>
                        <a href={blog.url}>url</a>
                        <p>likes: {blog.likes}</p>
                        <p>user: {blog.user.username}</p>
                        {blog.user.username === props.postedBy ?

                            <button type='button' onClick={() => remove(blog)} className='btn btn-danger btn-sm'>Remove</button> : null
                        }

                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default ToggleBlogDetails