import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './OrganizationInfo.module.css'

function OrganizationInfo() {
  const [orgData, setOrgData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get('http://ongapi.alkemy.org/api/organization');
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
        <Link className={styles.button} to="/backoffice/organization/edit">Edit Info</Link>
      </div>
    </div>
  );
}

export default OrganizationInfo;