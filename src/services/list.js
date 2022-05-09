import axios from 'axios'

const baseUrl = 'https://jsonplaceholder.typicode.com/posts'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newItem => {
  const response = await axios.post(baseUrl, newItem)
  return response.data
}

export default {
  getAll,
  create
}
