import { Link } from 'react-router-dom';

function OrganizationInfo({info}) {
  return (
    <>
      <h1>{info.title}</h1>
      <img src={info.image} alt="Organization" />
      <p>{info.shortDescription}</p>
      <Link to="/backoffice/organization/edit">Edit Info</Link>
    </>
  );
}

OrganizationInfo.defaultProps = {
  info: {
    name: 'Somos Mas',
    image: '',
    shortDescription: 'Desde 1997 en Somos Más trabajamos con los chicos y chicas, mamás y papás, abuelos y vecinos del barrio La Cava generando procesos de crecimiento y de inserción social.'
  }
}

export default OrganizationInfo;