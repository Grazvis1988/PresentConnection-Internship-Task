import axios from 'axios'

const baseUrl = 'https://jsonplaceholder.typicode.com/posts'

const getItem = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

export default {
  getItem
}
