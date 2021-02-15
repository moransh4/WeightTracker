import {  registrationConstants} from '../_constants';
import { validator } from '../_helpers';

const INITIAL_STATE_REGISTRATION = {
  currentStep: 1,
  // --------------------------
  form1Invalid: false,
  // -------------------------
  form2Invalid: false,
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
      sportsLevel: '',
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
    case registrationConstants.SET_RESISTRATION_BACK_STEP:
        return {...state,
          currentStep: state.currentStep - 1,
        };
    case registrationConstants.SET_RESISTRATION_NEXT_STEP:
        return {...state,
          form1Invalid : state.currentStep == 1 ? false : state.form1Invalid,
          form2Invalid : state.currentStep == 2 ? false : state.form2Invalid,
          currentStep: state.currentStep + 1,     
        };
    case registrationConstants.RESET_REGISTRATION:
      return {
        ...INITIAL_STATE_REGISTRATION 
        };
    case registrationConstants.SET_FORM1:
        return {...state,
          userDetails : validator(state.userDetails, action.input)
        }; 
    case registrationConstants.SET_FORM2:
        return {...state,
          userConnection : validator(state.userConnection, action.input)
        }; 
    case registrationConstants.SET_FORM1_VALIDATION_STATUS:
      return {...state,
        form1Invalid : true
      };
    case registrationConstants.SET_FORM2_VALIDATION_STATUS:
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