import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect, Link } from 'react-router-dom';


function Test() {
    return (
        <div className="">
                <h1>Test Page</h1>
                <div>
                    <div><Link to="/test">test</Link></div>
                    <div><Link to="/a">a</Link></div>
                    <div><Link to="/b">b</Link></div>
                </div>
                <Switch>
                    <Route exact path="/test" >
                        <h2>test main</h2>
                    </Route>
                    <Route path="/a" >
                        <h2>test a</h2>
                    </Route>
                    <Route path="/b" >
                        <h2>test b</h2>
                    </Route>
                </Switch>
                
        </div>
    );
}

export { Test };