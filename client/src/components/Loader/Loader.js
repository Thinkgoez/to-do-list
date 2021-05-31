import React from 'react';
import PulseLoader from "react-spinners/PulseLoader";

export const Loader = () => (
    <div style={{textAlign: 'center', marginTop: '20px'}}>
        <PulseLoader color="#fff" margin='10px' size='10px' />
    </div>
)