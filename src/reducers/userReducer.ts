import { SIGN_IN, SIGN_OUT, SIGN_UP, SIGN_UP_ERROR, LOGGED_IN_AS_ADMIN } from 'actions/types';

const initalState = {
  loginResponse: null,
  statusCode: null,
  adminStatusCode: null,
  error: null,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        loginResponse: action.payload.data,
        statusCode: action.payload.statusCode,
      };

    case SIGN_UP:
      return {
        ...state,
        error: action.payload.error,
      };

    case SIGN_UP_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case SIGN_OUT:
      return {
        ...state,
        statusCode: null,
        loginResponse: null,
      };

    case LOGGED_IN_AS_ADMIN:
      return {
        ...state,
        adminStatusCode: action.payload.adminStatusCode,
      };
    default:
      return state;
  }
};
