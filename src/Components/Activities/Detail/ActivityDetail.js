import React, { useState, useEffect} from 'react';

const MockTitleComponent = ({children}) => {
    return (<h1>{children}</h1>)
}

const ActivityDetail = ({match}) => {

    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");

    const id = match.params.id

    useEffect(() => {
        fetch(`http://ongapi.alkemy.org/api/activities/${id}`)
        .then((res)=>res.json())
        .then((data)=>{
            setTitle(data.data.name);
            setContent(data.data.description);
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


