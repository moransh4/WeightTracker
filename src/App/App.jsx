import React, { useEffect ,useState } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import {Test} from '../_components/test'
import './App.scss';

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();
 
    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);


    return (
        <div className="">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" />
                            <PrivateRoute path="/weight"/>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/test" component={Test} />
                            <Route path="*" >Not Found 404</Route>
                        </Switch>
                    </Router>
        </div>
    );
}

export { App };