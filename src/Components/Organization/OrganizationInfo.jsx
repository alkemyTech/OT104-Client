import { Link } from 'react-router-dom';
import styles from './OrganizationInfo.module.css'

function OrganizationInfo({info}) {
  return (
    <div className={styles.container}>
      <img src={info.image} alt="Organization" />
      <div className={styles.info}>
        <h1 className={styles.name}>{info.name}</h1>
        <p className={styles.description}>{info.shortDescription}</p>
        <Link className={styles.button} to="/backoffice/organization/edit">Edit Info</Link>
      </div>
    </div>
  );
}

export default OrganizationInfo;