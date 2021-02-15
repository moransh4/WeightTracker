import { put, takeLatest  } from 'redux-saga/effects';


function* handleLoginSuccess() {
    console.log('User Login!');
}

export  function* onUserSignIn()
{
    yield takeLatest('USERS_LOGIN_SUCCESS', handleLoginSuccess);
}