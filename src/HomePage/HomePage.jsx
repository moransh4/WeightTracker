import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions';
import Header from '../_components/Header/Header';
import './HomePage.scss'
import { Route, Redirect } from 'react-router-dom';


function HomePage(props) {
    const user = useSelector(state => state.authentication.user);
    console.log(user);
    const dispatch = useDispatch();

    useEffect(() => {
        //CHECK IF USER IS LOGIM
        dispatch(userActions.getAll());
    },[]);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        user ?
        <div className="">
            <Header username={user.FirstName}></Header>
            <div className="container">
                <h1>Hi {user.FirstName}!</h1>
                <h2>Welcome To Weights Tracker App!!</h2>
                <p>
                    <Link to="/login">Logout</Link>
                </p>   
                </div>
        </div>
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    );
}

export { HomePage };