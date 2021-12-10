import React, { useState, useEffect} from 'react';


const MockTitleComponent = ({children}) => {
    return (<h1 className="display-5">{children}</h1>)
}

const ActivityDetail = ({match}) => {

    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");

    const id = match.params.id

    useEffect(() => {
        fetch(`http://ongapi.alkemy.org/api/activities/${id}`)
        .then((res)=>res.json())
        .then((data)=>{
            if(data.success===true){
                setTitle(data.data.name);
                setContent(data.data.description);
            }else{
                setTitle("No encontrado")
                setContent("La actividad solicitada no existe o no está disponible.")
            }
        })
    },[])

    return(
        <>
            <MockTitleComponent>{title}</MockTitleComponent>
            <div>{content}</div>
        </>
    );
}

export default ActivityDetail;


