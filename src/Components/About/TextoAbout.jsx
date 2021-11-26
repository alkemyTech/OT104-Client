import React, { useEffect, useState } from 'react'
import axios from "axios";
// import { useDispatch } from 'react-redux'

const TextoAbout = () => {
  // const dispatch = useDispatch()
  const [aboutText, setAboutText] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
      setAboutText(response.data[0].body)
    }
    loadUsers()
  }, []);

  return (
    <div>
      <h1>{aboutText}</h1>
    </div>
  )
}

export default TextoAbout
