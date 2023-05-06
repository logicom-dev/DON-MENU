import axios from 'axios'
const url = "https://thedon-api.onrender.com/api/" 
//const url=process.env.REACT_APP_ADRESSE+"api";  si en utulise .env
export default axios.create({
    baseURL: url
})

// http://localhost:8800/articles / "http://localhost:3003/api"