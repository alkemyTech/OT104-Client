import React from 'react';
import '../CardListStyles.css';
import Card from 'react-bootstrap/Card';

const ActivitiesList = ({data}) => {

  return (
          <div>
               <ul className="list-container">
                {data.length > 0 ?
                    data.map((activity) => {
                        return(
                           <Card key={activity.id} style={{ width: '18rem' }}>
                             <Card.Body >
                               <Card.Title>{activity.name}</Card.Title>
                               <Card.Text>{activity.description}</Card.Text>
                             </Card.Body>
                            </Card>
                        )
                    })
                :
                 <p>No hay actividades</p>
                }
               </ul>
          </div>
    );
}
 ActivitiesList.defaultProps = {data: [
        {id: 2, name: 'Titulo de prueba', description: 'Descripcion de prueba'},
        {id: 1, name: 'Titulo de prueba', description: 'Descripcion de prueba'},
        {id: 3, name: 'Titulo de prueba', description: 'Descripcion de prueba'}
    ]
  
}
export default ActivitiesList;