import axios from 'axios'

const APIRequest = axios.create({
    baseURL: "http://localhost:8000",
    validateStatus: false,
})

export default APIRequest