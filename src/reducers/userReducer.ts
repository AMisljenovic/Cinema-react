import { SIGN_IN, SIGN_OUT } from 'actions/types';

const initalState = {
  loginResponse: null,
  statusCode: null,
};


export default (state = initalState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        loginResponse: action.payload.data,
        statusCode: action.payload.statusCode,
      };
    case SIGN_OUT:
      return {
        ...state,
        statusCode: null,
      };


    default:
      return state;
  }
};
