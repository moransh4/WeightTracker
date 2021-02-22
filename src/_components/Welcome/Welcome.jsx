import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../_actions/user.actions';
import './Welcome.scss'


function Welcome() {
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        //CHECK IF USER IS LOGIM
        dispatch(userActions.getAll());
    },[]);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <div className="">
                <h1>Hi {user.FirstName}!</h1>
                <h2>Welcome To Weights Tracker App!!</h2>
                <p>
                    <Link to="/login">Logout</Link>
                </p>   
        </div>
    );
}

export { Welcome };