import { userConstants } from '../_constants';

export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { 
        registering: true 
      };
    case userConstants.REGISTER_STEP_1:
      return {
        userDetails: action.userDetails
      };
    case userConstants.REGISTER_STEP_2:
      return {
        userDetails: state.userDetails,
        userConnection: action.userConnection
      };
    case userConstants.INVALID_FORM_1:
      return {};
    case userConstants.INVALID_FORM_2:
      return {};
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}