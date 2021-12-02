import React from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';


const MiembrosAbout = ({ data }) => {

  return (
    <div>
      <Row xs={1} md={2} className="g-4">
        {data.length > 0 ?
          data.map((activity) => {
            return (
              <Card bg="info" border="dark " key={activity.id} style={{ width: '28rem' }} >
                <Card.Img variant="top" style={{ height: '13rem', width: '13rem' }} src={activity.image} />
                <Card.Body>
                  <Card.Title>{activity.name} </Card.Title>
                  <Card.Text>
                    {activity.description}
                  </Card.Text>
                  <Card.Link href={activity.linkedinUrl}>Linkdin</Card.Link>
                  <Card.Link href={activity.facebookUrl}>Facebook</Card.Link>
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
    { id: 2, name: 'Sebastián', image: " https://pm1.narvii.com/6567/2f2799371096513f7f3d566efd4610c6cc4bd58d_hq.jpg", description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque asperiores molestias tenetur praesentium est perspiciatis ', facebookUrl: "https://www.facebook.com/groups/2469024430075023", linkedinUrl: "https://www.linkedin.com/in/carlos-janon-developer/" },
    { id: 1, name: 'Andrea', image: " https://pm1.narvii.com/6567/2f2799371096513f7f3d566efd4610c6cc4bd58d_hq.jpg", description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque asperiores molestias tenetur praesentium est perspiciatis voluptatum, obcaecati quaerat vero minus,', facebookUrl: "https://www.facebook.com/groups/2469024430075023", linkedinUrl: "https://www.linkedin.com/in/carlos-janon-developer/" },
    { id: 3, name: 'Laura', image: " https://pm1.narvii.com/6567/2f2799371096513f7f3d566efd4610c6cc4bd58d_hq.jpg", description: 'Lorem ipsum dolor quaerat vero minus, mollitia optio, magnam quam a quod? Maiores eos qui repellendus?', facebookUrl: "https://www.facebook.com/groups/2469024430075023", linkedinUrl: "https://www.linkedin.com/in/carlos-janon-developer/" }
  ]

}

export default MiembrosAbout

