import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import ToggleBlogDetails from './ToggleBlogDetails'
import Blog from './Blog'
import BlogForm from './BlogForm.js'

describe('<ToggleBlogDetails />', () => {

    let component

    beforeEach(() => {

        const blog = {

            title: 'Title',
            author: 'John Doe',
            url: 'www.url.com',
            likes: 100,
            user: {
                username: 'no one'
            },
            id: '645nbnxgs000fdsg'
        }

        component = render(
            <ToggleBlogDetails key={blog.id} buttonLabel='View details'>
                <Blog blog={blog}/>
            </ToggleBlogDetails>
        )
    })

    test('by default, render only blog title and author', () => {

        const expanded = component.container.querySelector('.expanded')

        expect(expanded).toHaveStyle('display: none')
    })

    test('clicking the View button shows blog details', () => {

        const viewButton = component.getByText('View details')
        fireEvent.click(viewButton)

        const expanded = component.container.querySelector('.expanded')
        const url = component.getByText('url', { exact: false })
        const likes = component.getByText('likes', { exact: false })
        const username = component.getByText('user', { exact: false })

        expect(expanded).not.toHaveStyle('display: none')
        expect(url).toBeVisible()
        expect(likes).toBeVisible()
        expect(username).toBeVisible()
    })
})

test('<BlogForm /> calls the event handler it was given', () => {

    const addBlog = jest.fn()

    const component = render(

        <BlogForm addBlog={addBlog}/>
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('#blogForm')

    fireEvent.change(title, {

        target: { value: 'Title' }
    })

    fireEvent.change(author, {

        target: { value: 'Autor' }
    })

    fireEvent.change(url, {

        target: { value: 'www.url.com' }
    })

    fireEvent.submit(form)

    expect(addBlog.mock.calls).toHaveLength(1)

    expect(addBlog.mock.calls[0][0].title).toBe('Title')
    expect(addBlog.mock.calls[0][0].author).toBe('Autor')
    expect(addBlog.mock.calls[0][0].url).toBe('www.url.com')
})