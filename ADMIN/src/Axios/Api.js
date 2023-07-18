import axios from 'axios'
export default axios.create({
    baseURL: process.env.REACT_APP_API
})

// export default axios.create({
//     baseURL: "http://localhost:3000/api/"
// "https://mascotte-api.onrender.com/api"
// })
