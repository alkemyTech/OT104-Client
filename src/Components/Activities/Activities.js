import React, { useEffect } from "react";
import { Stack } from "react-bootstrap";
import ActivitiesList from "./ActivitiesList";
import { useDispatch, useSelector } from "react-redux";
import { getActividades } from "./../../features/activities/activitiesSlice";
import Title from "../Title/Title";
import Spinner from "../Spinner/Spinner";

const Activities = () => {
  const activities = useSelector((state) => state.activities.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActividades());
  }, []);

  return (
    <Stack>
      <Title bg={"images/campaigns/Foto2.jpg"}>Actividades</Title>
      <div className="my-4">
        {activities.length > 0 ? (
          <ActivitiesList data={activities} />
        ) : (
          <Spinner />
        )}
      </div>
    </Stack>
  );
};

export default Activities;
