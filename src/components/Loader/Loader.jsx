import React from 'react';
import ReactLoading from 'react-loading';
import './Loader.scss'

const Loader = () => {
    return (
        <div className="oveflow">
            <div className="loader">
                <ReactLoading type='spin' color='#000000' height={80} width={80}/>
            </div>
        </div>
    );
};

export default Loader;