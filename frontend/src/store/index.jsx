import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/user.slice";
import profile from "./slices/profile.slice"
const appStore = configureStore( {
    reducer: {
        user,
        profile
    }
} );

export default appStore;