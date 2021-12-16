import { Stack } from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import Nav from "./Nav";

const Header = ({ openSidebar }) => {
  const location = useRouteMatch("/backoffice");

  if (location === null) return null;

  return (
    <Stack className="mb-3">
      <Breadcrumb />
      <Nav openSidebar={openSidebar} />
    </Stack>
  );
};

export default Header;
