import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLocationFirstModal:false
}
const AlwayaPersistStore = createSlice({
    name:"AlwaysPersistStore",
    initialState,
    reducers:{
        setLocationFirstModal:(state,action)=>{
            state.isLocationFirstModal=true
        }
    }

})

export const {setLocationFirstModal} = AlwayaPersistStore.actions;

export default AlwayaPersistStore.reducer;