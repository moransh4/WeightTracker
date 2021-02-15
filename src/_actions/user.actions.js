import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    getUserDetailsById,
    logout,
    getAll,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    if (user && user.length > 0 ){
                        // store user connection and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('user-connection', JSON.stringify(user[0]));
                    
                        userService.getUserDetailsById(user[0].ID).then(user =>{
                            // store user details and jwt token in local storage to keep user logged in between page refreshes
                            localStorage.setItem('user-details', JSON.stringify(user));
                            dispatch(success(user));
                            history.push('/');
                        });
                    }
                    else{
                        dispatch(failure('You have entered an invalid username or password'));
                        dispatch(alertActions.error('You have entered an invalid username or password'));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function getUserDetailsById(id) {
    return dispatch => {
        dispatch(request({ id }));

        userService.getUserDetailsById(user.ID).then(user =>{
            dispatch(success(user));
        });
    };

    function request(user) { return { type: userConstants.REFRESH, id } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

//TODO: get all users - and manag - for admin user
function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
//TODO: DELETE ACCOUNT OPTAIN FOR USER
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}