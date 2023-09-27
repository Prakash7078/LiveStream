import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import {toast} from 'react-toastify';

export const getOverlays=createAsyncThunk("api/getOverlays",async()=>{
    const response = await axios.get('http://127.0.0.1:5000/api/overlays');
    return response.data.overlays;
    });
export const addOverlays=createAsyncThunk("api/addOverlays",async({newOverlay,livestreamURL})=>{
    await axios.post('http://127.0.0.1:5000/api/overlays', { content: newOverlay,url:livestreamURL }).then((response) => {
      // Refresh the list of overlays
      toast.success(response.data.msg);
    });
})
export const deleteOverlays=createAsyncThunk("api.deleteOverlays",async(id)=>{
    await axios.delete(`http://127.0.0.1:5000/api/overlays/delete/${id}`).then((response)=>{
      toast.success(response.data.msg);
    }).catch(err=>toast.error(err.message));
})
const overSlice=createSlice({
    name:"overlays",
    initialState:{
        overlays:[],
        load:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getOverlays.pending, (state) => {
            state.load = true;
          })
        .addCase(getOverlays.fulfilled, (state, { payload }) => {
            state.load = false;
            console.log("payload",payload)
            state.overlays = payload;
        })
        .addCase(getOverlays.rejected, (state) => {
            state.load = false;
            toast.error("Network error!");
        });
    }
})
export default overSlice.reducer;