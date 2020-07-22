import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import repertoryReducer from './repertoryReducer';
import hallReducer from './hallReducer';
import reservationReducer from './reservationReducer';

const rootReducer = combineReducers({
  movies: movieReducer,
  repertoires: repertoryReducer,
  halls: hallReducer,
  reservations: reservationReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>
