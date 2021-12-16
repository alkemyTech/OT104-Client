import { useEffect, useState } from "react";
import { Navbar, Stack, Button } from "react-bootstrap";
import { getRequest } from "../../../Services/privateApiService";
import { List } from "react-bootstrap-icons";

const Nav = () => {
  const [orgName, setOrgName] = useState("");
  const [_, setMenuIsOpen] = useState(false);

  const openMenu = () => {
    setMenuIsOpen((prev) => {
      if (!prev) {
        document.getElementById("menuIcon").style.transform = "rotate(90deg)";
        return true;
      } else {
        document.getElementById("menuIcon").style.transform = "rotate(0deg)";
        return false;
      }
    });
  };

  useEffect(() => {
    (async () => {
      try {
        let res = await getRequest(process.env.REACT_APP_URL_ORGANIZATION);
        setOrgName(res.data.data.name);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  return (
    <div>
      <Stack direction="horizontal" gap={3}>
        <Button variant="light" className="d-flex p-0" onClick={openMenu}>
          <List
            size={24}
            id="menuIcon"
            style={{
              transition: "ease .5s",
            }}
          />
        </Button>
        <Navbar.Brand className="mr-0 fw-bold">{orgName}</Navbar.Brand>
      </Stack>
    </div>
  );
};

export default Nav;
