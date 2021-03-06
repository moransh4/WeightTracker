import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import {  useDispatch, useSelector } from 'react-redux';
import { registrationActions, userActions } from '../../_actions';
import   './FinishRegistering.scss';


function FinishRegistering() {
    const dispatch = useDispatch();
    const userConnection = useSelector(state => state.registration.userConnection);
    const userDetails = useSelector(state => state.registration.userDetails);

    const handleBack = () => {
        dispatch(registrationActions.backBtnClick());
    }
    
    const handleReset = () => {
        dispatch(registrationActions.resetRegistration());
    }

    const register = () => {
        dispatch(registrationActions.register(userDetails , userConnection));
    }


    return (
        <div className="col-lg-3 finishRegistering">
            <p>
                You are now done! 
            </p>
            <Button variant="contained" color="primary" className="btn-finish" onClick={() => register()}>Submit & Let's Go!</Button>
            <div className="inline">
            <Button variant="contained" color="primary" className="btn-back" onClick={() => handleBack()}>Back</Button> 
            <Button variant="contained" color="secondary" className="btn-reset" onClick={() => handleReset()}>Reset</Button> 
            </div>
        </div>
    );
}

export { FinishRegistering };