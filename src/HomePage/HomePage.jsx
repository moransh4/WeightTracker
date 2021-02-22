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
    const user = useSelector(state => state.authentication.user);
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
        user ?
        <div className="">
            <Header username={user.FirstName}></Header>
            <div className="container">
            {/* <Router history={history}> */}
                <Switch>
                    <Route exact path="/" component={Welcome}/>
                    {/* <Route path="/addWeight" component={AddWeights}/> */}
                    <Route path={`${path}/addWeight`} component={AddWeights}/>
                </Switch>
            {/* </Router> */}
            </div>
        </div>
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    );
}

export { HomePage };