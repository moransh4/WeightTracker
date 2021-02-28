import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, Switch, Router , useRouteMatch } from 'react-router-dom';
import Header from '../_components/Header/Header';
import {Welcome} from '../_components/Welcome/Welcome';
import {AddWeights} from '../_components/AddWeights/AddWeights';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={ props => {
            return (              
                localStorage.getItem('user-details')? 
                    <>
                    <Header user={JSON.parse(localStorage.getItem('user-details'))}></Header>
                    <Switch>
                        <Route exact path={`/`} component={ () => <Welcome user={JSON.parse(localStorage.getItem('user-details'))}/>} />
                        <Route path={`/weight/add`} component={AddWeights}/>
                        <Route path={`/weight/edit`} component={AddWeights}/>
                        <Route path="*" >Not Found 404</Route>
                    </Switch>
                    </>
                    : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
        }
    } />
)