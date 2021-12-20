import React from 'react';
import { LinkedinFollowCompany, TwitterButton } from 'react-social-plugins'

const RedesAbout = () => {

    return(
        <div
            id="socialNeworksContainer"
            style={{
                width:"100%", 
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                height:"5rem"
            }}>
            <div>
                <TwitterButton
                    target="@somosmas"
                    text="Compartí el trabajo de Somos Más"
                    type="Share"
                />
            </div>
            <div className="ms-3">
                <LinkedinFollowCompany
                    companyId={3144678}
                    counter="top" // Or "right"
                    lang="es_AR"
                />
            </div>

            <a className="ms-3" href="https://www.facebook.com/Somos_Más"><i className="bi bi-facebook display-6"></i></a>
            <a className="ms-3" href="https://www.instagram.com/Somos_Más"><i className="bi bi-instagram display-6 text-secondary"></i></a>

        </div>
    );
}

export default RedesAbout;