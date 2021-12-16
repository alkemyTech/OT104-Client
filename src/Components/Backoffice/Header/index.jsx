import { Stack } from "react-bootstrap";
import Breadcrumb from "./Breadcrumb";
import Nav from "./Nav";

const Header = () => {
  return (
    <Stack className="mb-3">
      <Breadcrumb />
      <Nav />
    </Stack>
  );
};

export default Header;
