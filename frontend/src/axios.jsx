import axios from "axios"


const URL = process.env.REACT_APP_WEBSITE_URL

const instance = axios.create({
    baseURL: URL,
    headers:{
      Authorization:localStorage.getItem('access_token')? 'JWT '+localStorage.getItem('access_token'):null,
      'Content-Type':'application/json',
      accept:'application/json'
    }
  })
  
  export default instance