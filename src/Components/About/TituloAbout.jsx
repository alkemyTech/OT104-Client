import React, { useEffect } from "react";
import { fetchOrgData } from "../../features/about/aboutReducer";
import { useDispatch, useSelector } from "react-redux";

const TituloAbout = () => {
  const dispatch = useDispatch();
  const { orgData } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(fetchOrgData());
  }, [dispatch]);

  return (
    <div>
      <h1>{orgData.name}</h1>
    </div>
  );
};
export default TituloAbout;
