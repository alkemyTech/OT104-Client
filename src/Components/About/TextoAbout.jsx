import React, { useEffect, useState } from 'react'
import axios from "axios";
// import { useDispatch } from 'react-redux'

const TextoAbout = () => {
  // const dispatch = useDispatch()
  const [aboutText, setAboutText] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(`http://ongapi.alkemy.org/api/organization`)
      setAboutText(response.data.data.short_description)
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
