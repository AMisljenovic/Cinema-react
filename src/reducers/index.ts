import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import repertoryReducer from './repertoryReducer';
import hallReducer from './hallReducer';
import reservationReducer from './reservationReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  movies: movieReducer,
  repertoires: repertoryReducer,
  halls: hallReducer,
  reservations: reservationReducer,
  users: userReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>
