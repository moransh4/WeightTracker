import { registrationConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const registrationActions = {
    handleChangeForm1,
    handleChangeForm2,
    submitStep1,
    submitStep2,
    changeCurrentStep,
    resetRegistration,
    register,
};

function handleChangeForm1(input) {    
    return dispatch => {
        dispatch({ type: registrationConstants.INPUTS_FORM1_CHANGE, input });
    }
}

function handleChangeForm2(input) {    
    return dispatch => {
        dispatch({ type: registrationConstants.INPUTS_FORM2_CHANGE, input });
    }
}

function resetRegistration()
{
    return dispatch => {
        dispatch({ type: registrationConstants.RESET_REGISTRATION });
    }  
}

function submitStep1(userDetails) {
    return dispatch => {
        if(!userDetails.firstName || !userDetails.lastName || !userDetails.age || !userDetails.height || !userDetails.weight || !userDetails.gender)
        {
            dispatch(invalidForm());
        }
        else  {
            dispatch(submitForm());
            dispatch(changeCurrentStep(2));
    
        }
    }

    function invalidForm() { return { type: registrationConstants.INVALID_FORM_1} }
    function submitForm() { return { type: registrationConstants.SUBMIT_STEP_1 } }
    function changeCurrentStep(stepNum) { return { type: registrationConstants.CHANGE_CURRENT_STEP, stepNum }}

}


function submitStep2(userConnection) {
    return dispatch => {
        if(!userConnection.email || !userConnection.username || !userConnection.password)
        {
            dispatch(invalidForm());
        }
        else  {
            dispatch(submitForm());
            dispatch(changeCurrentStep(3));
        }
    }

    function invalidForm() { return { type: registrationConstants.INVALID_FORM_2} }
    function submitForm() { return { type: registrationConstants.SUBMIT_STEP_2 } }
    function changeCurrentStep(stepNum) { return { type: registrationConstants.CHANGE_CURRENT_STEP, stepNum }}

}

function changeCurrentStep(stepNum) {
    return dispatch => {
        dispatch({type: registrationConstants.CHANGE_CURRENT_STEP, stepNum });
    }

}



function register(userDetails , userConnection) {
    return dispatch => {
        dispatch(request());

        userService.register(userDetails , userConnection)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: registrationConstants.REGISTER_REQUEST } }
    function success() { return { type: registrationConstants.REGISTER_SUCCESS } }
    function failure(error) { return { type: registrationConstants.REGISTER_FAILURE, error } }
}