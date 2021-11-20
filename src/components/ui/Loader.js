import React from 'react'
import Loader from "react-loader-spinner";


const LoaderComponent = () => {
    return (
        <div className="container__loader">
            <Loader
                type="Audio"
                color="#0062CC"
                height={100}
                width={100}
                // timeout={3000} //3 secs
            />
        </div>
    )
}

export default LoaderComponent
