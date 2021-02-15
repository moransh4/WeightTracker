import { registrationConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const registrationActions = {
    handleChangeForm1,
    handleChangeForm2,
    backBtnClick,
    nextBtnClick,
    resetRegistration,
    register,
};

function handleChangeForm1(input) {    
    return { type: registrationConstants.SET_FORM1, input };
}

function handleChangeForm2(input) {  
    return  { type: registrationConstants.SET_FORM2, input };
}

function resetRegistration()
{
    return { type: registrationConstants.RESET_REGISTRATION };
}

function backBtnClick() {
    return { type: registrationConstants.SET_RESISTRATION_BACK_STEP };
}

function nextBtnClick(currentStep , form) {
    return dispatch => { 
        if(currentStep == 1){
            if(!form.firstName || !form.lastName || !form.age || !form.height || !form.weight || !form.gender)
            {
                dispatch(invalidForm1());
            }
            else{
                dispatch(next());
            }
        }
        else if(currentStep == 2){
            if(!form.email || !form.username || !form.password)
            {
                dispatch(invalidForm2());
            }
            else{
                dispatch(next());
            }
        } 
    }

    function invalidForm1() { return { type: registrationConstants.SET_FORM1_VALIDATION_STATUS} }
    function invalidForm2() { return { type: registrationConstants.SET_FORM2_VALIDATION_STATUS} }
    function next() { return {type: registrationConstants.SET_RESISTRATION_NEXT_STEP } }

}

function register(userDetails , userConnection) {
    return dispatch => {
        dispatch(request());

        const isRegister = userService.register(userDetails , userConnection);

        if(isRegister){
            debugger
            dispatch(success());
            history.push('/login');
            dispatch(alertActions.success('Registration successful'));
        }
        else{
            const error = 'תהליך הרישום למערכת נכשל';
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
        }
         
    };

    function request() { return { type: registrationConstants.REGISTER_REQUEST } }
    function success() { return { type: registrationConstants.REGISTER_SUCCESS } }
    function failure(error) { return { type: registrationConstants.REGISTER_FAILURE, error } }
}