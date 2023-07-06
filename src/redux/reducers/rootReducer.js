import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';



const initialState = {
  taches: [],
  tacheRename: '',
  idRename: '',

}


const todoSlice = createSlice({
    name: 'todos',
    initialState,

    reducers: {
      listTaches: (state, action) => {
        state.taches = action.payload;
      },

      ajouter: (state, action) =>{

        state.taches = [...state.taches, { id: action.payload.id, tache: action.payload.tache,  date: action.payload.date}];    
      },


      tacheRenom: (state, action)=>{

        state.tacheRename = action.payload.nameTache
        state.idRename = action.payload.id
      
      },

      rename: (state, action)=>{
       const id = state.idRename;
       const findRename =  state.taches.findIndex((i)=> i.id === id);
       if(findRename !== -1){
        state.taches[findRename].tache = action.payload.tache;
        state.taches[findRename].date = action.payload.dateRenam;
        state.tacheRename = ''
       }
      },

      drop: (state, action)=>{

        state.taches = state.taches.filter((i) => i.id !== action.payload);
        
      },

      showList:(state, action)=>{
        state.taches = action.payload;    
      }


    },
  });
  
  export const { listTaches, load, ajouter, showList, drop, tacheRenom, rename} = todoSlice.actions;

  export const fetchDatas = (datas) => async (dispatch) =>{
    try {
      dispatch(ajouter(datas))
      // const response = await axios.post('/addTaches', {datas});
      const response = await axios.post('https://api-todolist-a3aa7e82be36.herokuapp.com/addTaches', {datas});
      
    } catch (error) {
        
    }
  }
  export const RenameDatas = (tache, idReducer, dateRenam) => async (dispatch) =>{
    try {
      dispatch(rename({tache, dateRenam}))
      
      // const response = await axios.get(`/rename/${tache}/${idReducer}/${dateRenam}`);
      const response = await axios.get(`https://api-todolist-a3aa7e82be36.herokuapp.com/rename/${tache}/${idReducer}/${dateRenam}`);
 
    } catch (error) {
        
    }
  }

  export const deleteData = (id) => async (dispatch)=>{
    try {
      dispatch(drop(id))
      // const response = await axios.get(`/drop/${id}`)
      const response = await axios.get(`https://api-todolist-a3aa7e82be36.herokuapp.com/drop/${id}`)
    } catch (error) {
      
    }
  }



  export default todoSlice.reducer;