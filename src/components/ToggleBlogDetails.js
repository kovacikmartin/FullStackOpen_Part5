import React, { useState } from 'react'

const ToggleBlogDetails = (props) => {

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

    const expanded = { display: detailsHidden ? 'block' : 'none' }
    const children = React.Children.map(props.children, child => child.props)

    const blogStyle = {

        border: '1px solid black',
        marginBottom: 10
    }

    const deleteBlog = (child) => {

        props.deleteBlog(child)
    }

    return(

        <div style={blogStyle}>
            {props.children}<button type='button' onClick={toggleDetails}>{buttonLabel}</button>

            <div style={expanded}>
                {children.map(child => (
                    <div key={child.blog.id}>
                        <p>url: {child.blog.url}</p>
                        <p>likes: {child.blog.likes}</p>
                        <p>user: {child.blog.user.username}</p>
                        {child.blog.user.username === props.postedBy ?

                            <button type='button' onClick={() => deleteBlog(child.blog)}>Remove</button> : null
                        }

                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default ToggleBlogDetails