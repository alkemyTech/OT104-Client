import React from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


const MiembrosAbout = ({ data }) => {

  return (
    <div>
      <Row xs={1} md={2} className="g-4">
        {data.length > 0 ?
          data.map((activity) => {
            return (
              <Card bg="light" border="dark " key={activity.id} style={{ width: '20rem' }} >
                <Card.Img variant="top" src={activity.image} />
                <Card.Body>
                  <Card.Title>{activity.name} </Card.Title>
                  <Card.Text>
                    {activity.description}
                  </Card.Text>
                  <Button variant="outline-dark" href={activity.linkedinUrl}>Linkdin</Button>
                  <Button variant="outline-dark" href={activity.facebookUrl}>Facebook</Button>
                </Card.Body>
              </Card>
            )
          })
          :
          <p>No Hay Miembros Cargados en la Base de Datos</p>
        }
      </Row>

    </div>
  );
}
MiembrosAbout.defaultProps = {
  data: [
    {
      "id": 258,
      "name": "Osvaldo Olivera",
      "image": "http://ongapi.alkemy.org/storage/kw2hNujhuq.jpeg",
      "description": "Presidente",
      "facebookUrl": "https://www.facebook.com/100075440371054/",
      "linkedinUrl": "https://www.linkedin.com/in/osvaldo-olivera-785b78226/",
      "created_at": "2021-11-09T20:22:05.000000Z",
      "updated_at": "2021-11-23T04:34:29.000000Z",
      "deleted_at": null,
      "group_id": null
    },
    {
      "id": 259,
      "name": "Nahuel Narváez",
      "image": "http://ongapi.alkemy.org/storage/z5x07SOhzl.jpeg",
      "description": "Secretario",
      "facebookUrl": "https://www.facebook.com/100075448260572/",
      "linkedinUrl": "https://www.linkedin.com/in/nahuel-narváez-099b89226/",
      "created_at": "2021-11-09T23:25:38.000000Z",
      "updated_at": "2021-11-23T04:18:18.000000Z",
      "deleted_at": null,
      "group_id": null
    },
    {
      "id": 261,
      "name": "Griselda Germán",
      "image": "http://ongapi.alkemy.org/storage/dR97wbZyUN.jpeg",
      "description": "Tesorera",
      "facebookUrl": "https://www.facebook.com/100074894726439/",
      "linkedinUrl": "https://www.linkedin.com/in/griselda-germán-137b83226/",
      "created_at": "2021-11-10T00:32:23.000000Z",
      "updated_at": "2021-11-23T04:31:58.000000Z",
      "deleted_at": null,
      "group_id": null
    }
  ]

}

export default MiembrosAbout

