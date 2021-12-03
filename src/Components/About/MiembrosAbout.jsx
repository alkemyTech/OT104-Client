import React, { useEffect, useState } from 'react'
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const MiembrosAbout = () => {
  const [aboutText, setAboutText] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(`http://ongapi.alkemy.org/api/members`)
      setAboutText(response.data.data)
    }
    loadUsers()

  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',

      flexWrap: 'wrap',
      gap: '1em',

    }}>

      {
        aboutText.length > 0 ?
          aboutText.map((activity) => {
            return (
              <Card className="gap-1" bg="light" key={activity.id} style={{ width: '20rem' }} >
                <Card.Img variant="top" src={activity.image} />
                <Card.Body>
                  <Card.Title>{activity.name} </Card.Title>
                  <Card.Text>
                    {activity.description}
                  </Card.Text>
                  <div style={{ display: 'flex', justifyContent: "center", columnGap: "5%" }}>   <Button variant="outline-dark" href={activity.linkedinUrl}>Linkdin</Button>
                    <Button variant="outline-dark" href={activity.facebookUrl}>Facebook</Button>
                  </div>
                </Card.Body>
              </Card>
            )
          })
          :
          <p>No Hay Miembros Cargados en la Base de Datos</p>
      }
    </div >
  );
}


export default MiembrosAbout

