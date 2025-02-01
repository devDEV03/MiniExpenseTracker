import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../store/userSlice";

const appStore = configureStore({
    reducer : {
        user : UserReducer
    }
})

export default appStore;