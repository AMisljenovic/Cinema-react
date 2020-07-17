import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import repertoryReducer from './repertoryReducer';

const rootReducer = combineReducers({
  movies: movieReducer,
  repertoires: repertoryReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>
