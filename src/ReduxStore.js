// yourReduxStore.js

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // Middleware example, you may not need it
import myReducer from './Reducer';

const rootReducer = combineReducers({
    myReducer,
    // Thêm reducers khác nếu cần
  });
  
  const store = createStore(rootReducer);
  
  export default store;
