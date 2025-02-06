// 引入 axios
import axios from 'axios'
// 封装 baseURL
const request = axios.create({
    baseURL:"http://127.0.0.1:5001/",
    headers: {
      'Content-Type': 'application/json',
    },
})
// 向外暴露 request
export default request;