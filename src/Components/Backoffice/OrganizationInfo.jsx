import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import styles from "./OrganizationInfo.module.css";

function OrganizationInfo() {
  const [orgData, setOrgData] = useState({});
  const { REACT_APP_URL_ORGANIZATION } = process.env;

  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(REACT_APP_URL_ORGANIZATION);
        setOrgData(res.data.data);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <>
      <h1 className="text-center">Datos Organización</h1>
      <div className={styles.container}>
        <div className={styles.info}>
          <h2>Logo Organización</h2>
          <img src={orgData.logo} alt="Organization" />
          <h2>Nombre Organización</h2>
          <h4 className={styles.name}>{orgData.name}</h4>
          <h2>Descripcion Organización</h2>
          <p className={styles.description}>{orgData.short_description}</p>
          <Button
            className="button"
            role="button"
            as={Link}
            to="/backoffice/organization/edit"
          >
            Editar
          </Button>
        </div>
      </div>
    </>
  );
}

export default OrganizationInfo;
