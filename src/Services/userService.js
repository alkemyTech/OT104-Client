import axios from "axios"
import {
  putRequest,
  deleteRequest,
  postRequest,
  getRequest,
} from "./privateApiService" 

const baseUrl = "http://ongapi.alkemy.org/api/users" 

const getUsers = () => {
  const response = getRequest(`${baseUrl}`)
  return response
}

const createUser =  (user) => {
  const response = postRequest(`${baseUrl}`, user)
  return response
}

const getUserById = async (id) => {
  const response = getRequest(`${baseUrl}/${id}`)
  return response
}

const updateUser = async (id, user) => {
  const response = putRequest(`${baseUrl}`,id, user)
  return response
}

const deleteUser = async (id) => {
  const response = deleteRequest(`${baseUrl}`, id)
  return response
}

const userService = {
  delete : deleteUser,
  getById : getUserById,
  get : getUsers,
  create : createUser,
  update : updateUser
}

export default userService
