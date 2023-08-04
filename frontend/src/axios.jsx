import axios from "axios"


// const URL = process.env.REACT_APP_WEBSITE_URL
const instance = axios.create({
    baseURL: 'http://localhost:8000',
    headers:{
      Authorization:localStorage.getItem('access_toke n')? 'JWT '+localStorage.getItem('access_token'):null,
      'Content-Type':'application/json',
      accept:'application/json'
    }
  })
  
  export default instance