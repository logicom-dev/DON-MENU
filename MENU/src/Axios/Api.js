import axios from 'axios'

export default axios.create({
    baseURL:process.env.REACT_APP_API
})
//baseURL:"https://don-menu.onrender.com/api/" "http://localhost:3000/api"