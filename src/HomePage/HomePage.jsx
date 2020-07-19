import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions';
import Header from '../_components/Header/Header';
import './HomePage.scss'

function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    },[]);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <div className="">
            <Header username={user.firstName}></Header>
            <div className="container">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React Hooks!!</p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {                               
                                  user &&  user.user_details ? user.user_details.firstName + ' ' + user.user_details.lastName : ""
                                }
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={() => handleDeleteUser(user.id)} className="text-primary">Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>   
                </div>
        </div>
    );
}

export { HomePage };