import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import tripReducer from './tripReducer';

const rootReducer = combineReducers({
  form: formReducer,
  trips: tripReducer
});

export default rootReducer;
