import React,{ useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/index'


const BackofficeLayout = () => {
    const [ show, setShow ] = useState(false);
    const openSidebar = () =>{
        if (show===false) {
          document.getElementById("menuIcon").style.transform = "rotate(90deg)";
        } else {
          document.getElementById("menuIcon").style.transform = "rotate(0deg)";
        }
        setShow(prev => !prev);
    };

    const location = useRouteMatch("/backoffice");
    if (location === null) return null;

    return(
        <>
            <Header openSidebar={openSidebar}/>
            <Sidebar 
                show={show}
                openSidebar={openSidebar}
            />
        </>
    );
}  

export default BackofficeLayout