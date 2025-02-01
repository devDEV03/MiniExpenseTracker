import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        user : null,
        accessToken : ""
    },
    reducers : {
        addUser : (state,actions) => {
            localStorage.setItem("user", JSON.stringify(actions.payload));
            state.user = actions.payload;
        },
        removeUser : (state,actions) => {
            localStorage.removeItem("user", actions.payload);
            state.user = null;
        },
        addAccessToken : (state,actions) => {
            localStorage.setItem("accessToken", actions.payload);
            state.accessToken = actions.payload;
        },
        removeAcessToken : (state,actions) => {
            localStorage.removeItem("accessToken");
            state.accessToken = "";
        }
    }
})

export const {addUser, removeUser, addAccessToken, removeAcessToken} = userSlice.actions;

export default userSlice.reducer;