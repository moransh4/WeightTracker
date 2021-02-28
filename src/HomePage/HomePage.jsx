import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions';
import Header from '../_components/Header/Header';
import {Welcome} from '../_components/Welcome/Welcome';
import {AddWeights} from '../_components/AddWeights/AddWeights';
import './HomePage.scss'
import { Route, Redirect, Switch, Router , useRouteMatch } from 'react-router-dom';
import { history } from '../_helpers';



function HomePage(props) {
    const user = JSON.parse(localStorage.getItem('user-details'));
    const dispatch = useDispatch();
    const {path} = useRouteMatch();

    useEffect(() => {
        //CHECK IF USER IS LOGIM
        dispatch(userActions.getAll());
    },[]);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        user != null ?
        <div className="">
            <div className="container">
                {/* <Switch>
                    <Route exact path={`${path}`} component={ () => <Welcome user={user}/>} />
                    <Route path={`/weight/add`} component={AddWeights}/>
                    <Route path={`/weight/edit`} component={AddWeights}/>
                    <Route path="*" >Not Found 404</Route>
                </Switch> */}
            </div>
        </div>
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    );
}

export { HomePage };