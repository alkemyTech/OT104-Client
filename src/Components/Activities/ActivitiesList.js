import React, { useEffect, useState } from 'react';
import '../CardListStyles.css';
import Card from 'react-bootstrap/Card';
import { getActivities } from '../../Services/activitiesService';

const ActivitiesList = ({ data }) => {
  const [activitiesList, setActivitiesList] = useState([]);

  useEffect(() => {
    setActivitiesList(getActivities());
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '3rem',
      }}
    >
      {activitiesList.length > 0 ? (
        activitiesList.map((activity) => {
          return (
            <Card
              className='gap-2'
              bg='light'
              key={activity.id.toString()}
              style={{ width: '30rem' }}
            >
              <Card.Header>
                <h5 style={{ color: 'Crimson' }}>{activity.name}</h5>
              </Card.Header>
              <Card.Body>
                <Card.Text>{activity.description}</Card.Text>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <p>No hay actividades</p>
      )}
    </div>
  );
};

export default ActivitiesList;
