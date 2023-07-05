import {configureStore} from '@reduxjs/toolkit';
import todosReducer from './reducers/rootReducer';


const store = configureStore({
    reducer:{
        taches: todosReducer
    }
    
});
  
export default store;