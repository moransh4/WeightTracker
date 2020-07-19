import { REGISTER_STEP_1 , REGISTER_STEP_2 , REGISTER_STEP_3 } from "../_constants/user.constants";


export function validatetorMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === REGISTER_STEP_1) {
        debugger
        const user = action.userDetails;
        if ( !user.firstName || !user.lastName || !user.height || !user.weight  || !user.gender  || !user.age )
        {
            return dispatch({ type: "INVALID_FORM_1" });
        }

      }
      return next(action);
    };
  };
}