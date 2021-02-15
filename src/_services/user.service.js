import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getUserDetailsById,
    update,
    delete: _delete
};

const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
};

function login(username, password) {
    requestOptions.method = 'POST';
    requestOptions.body = JSON.stringify({ username, password });
    return fetch(`${config.apiUrl}/user/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.clear();
    localStorage.removeItem('user-connection');
    localStorage.removeItem('user-details');
    localStorage.removeItem('users');

}

function getAll() {
    requestOptions.method = 'GET';
    requestOptions.body = undefined;
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getUserDetailsById(id) {
    requestOptions.method = 'GET';
    requestOptions.body = undefined;
    return fetch(`${config.apiUrl}/userDetails/${id}`, requestOptions).then(handleResponse).then(res => {return res});
}

function getUniqueID() {
    return (Date.now() + ( (Math.random() * 100000).toFixed()));
}

 function saveUserDetail(userDetails, uid){
    userDetails.id = uid;
    requestOptions.body = JSON.stringify(userDetails);
    requestOptions.method = 'POST';
     fetch(`${config.apiUrl}/userDetails`, requestOptions)
    .then(res => {
        if(res.status == "error"){
            debugger
            return false;          
        }
        else{
            debugger
            return true;
        }
    })
    .catch(err => {
        debugger
        return false;          
    })
}

 function saveUserConnection(userConnection, uid){
    userConnection.id = uid;
    requestOptions.body = JSON.stringify(userConnection);
    requestOptions.method = 'POST';
     fetch(`${config.apiUrl}/user`, requestOptions)
    .then(res => {
        if(res.status == "error"){
            debugger
            return false;          
        }
        else{
            debugger
            return true;
        }
    })
    .catch(err => {
        debugger
        return false;          
    })
}

 function register(userDetails , userConnection) {
    const requestOptionsDelete = {
        method: 'DELETE',
        headers: authHeader()
    };
    const uid = getUniqueID(); 
    const isSaveUserDetails =  saveUserDetail(userDetails, uid);
    const isSaveUserConnection =  saveUserConnection(userConnection, uid);

    return isSaveUserDetails && isSaveUserConnection;s

    // if( !isSaveUserDetails || !isSaveUserConnection ) {
    //     fetch(`${config.apiUrl}/user/${uid}`, requestOptionsDelete);
    //     fetch(`${config.apiUrl}/userDetails/${uid}`, requestOptionsDelete);
    //     return false;
    // }
    // return true;
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}