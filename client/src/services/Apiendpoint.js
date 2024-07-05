import axios from 'axios'

const instance = axios.create({
        baseURL:'http://localhost:4003/user'
    })


export const post =(url,data)=> instance.post(url,data)