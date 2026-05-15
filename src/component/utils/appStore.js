import { configureStore } from "@reduxjs/toolkit";
import addUser from "./userSlice";
import addFeed from "./feedSlice";

const appStore=configureStore({
    reducer:{
        user:addUser,
        feed:addFeed
    }
})
 export default appStore;