import { GET_HALL } from 'actions/types';
import Hall from 'models/hall.model';

const initalState = {
  hall: null,
};

type HallState = {
  hall: Hall | null;
}

export default (state: HallState = initalState, action) => {
  switch (action.type) {
    case GET_HALL:
      return {
        ...state,
        hall: action.payload,
      };

    default:
      return state;
  }
};
