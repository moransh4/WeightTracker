

export function validatetorMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      return next(action);
    };
  };
}