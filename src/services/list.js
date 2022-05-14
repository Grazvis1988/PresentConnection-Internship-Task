import axios from 'axios'

const baseUrl = '/api/items'
// 'https://jsonplaceholder.typicode.com/posts'

const getAll = async (pagination) => {
  const request = await axios.post(baseUrl, pagination)
  return request.data
}

const create = async newItem => {
  const response = await axios.post(`${baseUrl}/postitem`, newItem)
  return response.data
}

const getItem = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}


export default {
  getAll,
  getItem,
  create
}
