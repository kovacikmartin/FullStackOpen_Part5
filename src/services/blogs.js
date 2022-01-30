import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {

    token = `bearer ${newToken}`
}

const getAll = async () => {

    const response = await axios.get(baseUrl)

    return response.data
}

const insert = async blog => {

    const config = {

        headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, blog, config)

    return response.data
}

const remove = async blog => {

    const config = {

        headers: { Authorization: token }
    }

    await axios.delete(`${baseUrl}/${blog.id}`, config)
}

const blogService = {

    setToken,
    getAll,
    insert,
    remove
}

export default blogService