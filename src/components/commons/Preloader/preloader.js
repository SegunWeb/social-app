import React from 'react';
import preloader from "../../../assets/preloader.svg";

const Preloader = () => {
    return (
        <div>
            <img src={preloader} alt="loading..."/>
        </div>
    );
};

export default Preloader;