import axios from 'axios';
import React, { useEffect, useState } from 'react'

const TituloAbout = () => {
  // const dispatch = useDispatch()
  const [aboutTitle, setAboutTitle] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(`http://ongapi.alkemy.org/api/organization`)
      setAboutTitle(response.data.data.name)
    }
    loadUsers()

  }, []);

  return (
    <div >
      <h1 >{aboutTitle}</h1>
    </div>
  )
}
export default TituloAbout
