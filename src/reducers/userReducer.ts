import { SIGN_IN, SIGN_OUT, SIGN_UP, SIGN_UP_ERROR } from 'actions/types';

const initalState = {
  loginResponse: null,
  statusCode: null,
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
        statusCode: action.payload.statusCode,
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

    default:
      return state;
  }
};
