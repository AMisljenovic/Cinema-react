import { SIGN_IN, SIGN_OUT, SIGN_UP, SIGN_UP_ERROR, LOGGED_IN_AS_ADMIN, DELETE_USER, UPDATE_USER, CLEAR_USER } from 'actions/types';

const initalState = {
  loginResponse: null,
  statusCode: null,
  adminStatusCode: null,
  error: null,
  updateStatusCode: null,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        loginResponse: action.payload.data,
        statusCode: action.payload.statusCode,
        deleteStatusCode: null,
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
    case DELETE_USER:
      return {
        ...state,
        deleteStatusCode: action.payload.deleteStatusCode,
      };
    case UPDATE_USER:
      return {
        ...state,
        updateStatusCode: action.payload.updateStatusCode,
      };
    case CLEAR_USER:
      return {
        ...state,
        updateStatusCode: null,
      };
    default:
      return state;
  }
};
