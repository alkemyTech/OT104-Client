import { useEffect, useState } from "react";
import { Navbar, Stack, Button } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrgData } from "../../../features/about/aboutReducer";

const Nav = ({ openSidebar }) => {
  const organization = useSelector((state) => state.about.orgData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrgData());
  }, []);
  return (
    <div>
      <Stack direction="horizontal" gap={3}>
        <Button variant="light" className="d-flex p-0" onClick={openSidebar}>
          <List
            size={24}
            id="menuIcon"
            style={{
              transition: "ease .5s",
            }}
          />
        </Button>
        <Navbar.Brand className="mr-0 fw-bold">
          {organization.name}
        </Navbar.Brand>
      </Stack>
    </div>
  );
};

export default Nav;
