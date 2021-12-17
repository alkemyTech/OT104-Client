import React, { useEffect, useState } from 'react'
import { fetchOrgData } from "../../features/about/aboutReducer";
import { useDispatch, useSelector } from 'react-redux'

const TextoAbout = () => {
  const dispatch = useDispatch();
  const { orgData } = useSelector(state => state.about)

  useEffect(() => {
    dispatch(fetchOrgData());
  }, [dispatch]);

  return (
    <div>
      <h5>{orgData.short_description}</h5>
    </div>
  )
}

export default TextoAbout;
