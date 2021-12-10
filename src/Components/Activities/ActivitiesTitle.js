import React from 'react'

const ActivitiesTitle = (props) => {
  return (
    <>
        <h1>{props.title}</h1>
    </>
  )
}
 ActivitiesTitle.defaultProps = {
      title: "Listado Actividades"
  }
export default ActivitiesTitle
