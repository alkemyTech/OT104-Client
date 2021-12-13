import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import styles from './OrganizationInfo.module.css'

function OrganizationInfo() {
  const [orgData, setOrgData] = useState({});
  const {REACT_APP_URL_ORGANIZATION} = process.env;

  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(REACT_APP_URL_ORGANIZATION);
        setOrgData(res.data.data);
      } catch(err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <img src={orgData.logo} alt="Organization" />
      <div className={styles.info}>
        <h1 className={styles.name}>{orgData.name}</h1>
        <p className={styles.description}>{orgData.short_description}</p>
        <Button as={Link} to="/backoffice/organization/edit">Edit Info</Button>
      </div>
    </div>
  );
}

export default OrganizationInfo;