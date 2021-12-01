import axios from "axios"
const baseUrl = "http://ongapi.alkemy.org/api/"

const getUsers = async () => {
  try{
    const response = await axios.get(`${baseUrl}users`)
    return response.data
  }
  catch(err){
    return err
  }
}

const createUser = async (user) => {
  try{
    const response = await axios.post(`${baseUrl}users`, user)
    return response.data
  }
  catch(err){
    return err.response
  }
}

const getUserById = async (id) => {
  try{
    const response = await axios.get(`${baseUrl}users/${id}`)
    return response.data
  }
  catch(err){
    return err.response
  }
}

const updateUser = async (id, user) => {
  try{
    const response = await axios.put(`${baseUrl}users/${id}`, user)
    return response.data
  }
  catch(err){
    return err.response
  }
}

const deleteUser = async (id) => {
  try{
    const response = await axios.delete(`${baseUrl}users/${id}`)
    return response.data
  }
  catch(err){
    return err.response
  }
}

const userService = {
  delete : deleteUser,
  get : getUserById,
  getAll : getUsers,
  create : createUser,
  update : updateUser
}
