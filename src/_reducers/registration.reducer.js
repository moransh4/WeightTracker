import {  registrationConstants} from '../_constants';
import { validator } from '../_helpers';

const INITIAL_STATE_REGISTRATION = {
  currentStep: 1,
  // --------------------------
  form1Invalid: false,
  submitStep1: false,
  // -------------------------
  form2Invalid: false,
  submitStep2: false,
  // -------------------------
  successRegisteration: false,
  // -------------------------
  userDetails : {
      firstName: '',
      lastName: '',
      gender: '',
      age: '',
      height: '',
      weight: '',
      sportLevel: '',
      jobTitle: '', 
    },
    userConnection: {
      username: '',
      email: '',
      password: ''
    }
  };


export function registration(state = INITIAL_STATE_REGISTRATION, action) {
  switch (action.type) {
    case registrationConstants.CHANGE_CURRENT_STEP:
        return {...state,
          currentStep: action.stepNum,
        };
    case registrationConstants.RESET_REGISTRATION:
      return {
        ...INITIAL_STATE_REGISTRATION 
        };
    case registrationConstants.INPUTS_FORM1_CHANGE:
        return {...state,
          userDetails : validator(state.userDetails, action.input)
        }; 
    case registrationConstants.INPUTS_FORM2_CHANGE:
        return {...state,
          userConnection : validator(state.userConnection, action.input)
        }; 
    case registrationConstants.SUBMIT_STEP_1:
        return ({...state,
          ...{
            submitStep1: true,
            form1Invalid : false
          }     
        });
    case registrationConstants.SUBMIT_STEP_2:
        return {...state,
          ...{
            submitStep2: true,
            form2Invalid : false
          }      
        };
    case registrationConstants.SUBMIT_STEP_3:
      return {...state,
        submitStep3: true,
      };
    case registrationConstants.INVALID_FORM_1:
      return {...state,
        form1Invalid : true
      };
    case registrationConstants.INVALID_FORM_2:
      return {...state,
        form2Invalid : true
      };
    case registrationConstants.REGISTER_REQUEST:
        return state;
    case registrationConstants.REGISTER_SUCCESS:
      return {...state,
        successRegisteration : true
      };
    case registrationConstants.REGISTER_FAILURE:
      return {...state,
        successRegisteration : false
      };
    default:
      return state
  }
}