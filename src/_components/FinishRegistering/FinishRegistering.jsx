import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import   './FinishRegistering.scss';


function FinishRegistering(props) {

    return (
        <div className="col-lg-3 finishRegistering">
            <p>
                You are now done! 
            </p>
            <Button variant="contained" color="primary" onClick={() => props.handleReset()}>Reset</Button> 
            <Button variant="contained" color="primary" onClick={() => props.handleNext()}>Let's Go!</Button>
        </div>
    );
}

export { FinishRegistering };