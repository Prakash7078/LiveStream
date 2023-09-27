import { configureStore } from "@reduxjs/toolkit";
import overSlice from "./overSlice";
const store=configureStore({
    reducer:{
        overlays:overSlice,
    },
});
export default store;