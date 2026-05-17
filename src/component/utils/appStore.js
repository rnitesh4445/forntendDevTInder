import { configureStore } from "@reduxjs/toolkit";
import addUser from "./userSlice";
import addFeed from "./feedSlice";
import requestReducer from "./requestSlice";
import connectionReducer from "./connectionSlice";

const appStore=configureStore({
    reducer:{
        user:addUser,
        feed:addFeed,
        connections:connectionReducer,
        requests: requestReducer
    }
})
 export default appStore;