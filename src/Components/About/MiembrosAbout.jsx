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
      gap: '3rem',
    }}>
      {
        aboutText.length > 0 ?
          aboutText.map((activity) => {
            return (
              <Card className="gap-2" bg="light" key={activity.id} style={{ width: '18rem', height: '25rem' }} >
                <Card.Img variant="top" src={activity.image} />
                <Card.Body>
                  <Card.Title> <h3 >{activity.name}</h3> </Card.Title>
                  <br />
                  <Card.Text>
                    <h5>{activity.description}</h5>
                  </Card.Text>
                  <br />
                  <div style={{ display: 'flex', justifyContent: "center", columnGap: "15%" }}>   <Button variant="outline-success" href={activity.linkedinUrl}>Linkdin</Button>
                    <Button variant="outline-success" href={activity.facebookUrl}>Facebook</Button>
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

