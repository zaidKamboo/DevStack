import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast"
import backendHost from "../../api";
import { GET_PROFILE_ROUTE } from "../../utils";

const initialState = {};

const profileSlice = createSlice( {
    name: "profile",
    initialState,
    reducers: {
        setProfile: ( _, { payload } ) => payload,
        resetProfile: () => initialState,
    },
} );

export const getProfile = ( github_username ) => ( dispatch ) => {
    try {
        backendHost.get( GET_PROFILE_ROUTE + "?github_username=" + github_username, { withCredentials: true } )
            .then( ( res ) => {
                const { data, message } = res.data;
                console.log( res );
                dispatch( setProfile( data ) );
                toast.success( message )
            } )
            .catch( err => {
                console.log( err.response.data )
                toast.error( "Get Profile ERROR " + err.response.data.message )
            } )
    } catch ( error ) {
        console.log( "Get Profile ERROR " + error )
        toast.error( "Get Profile error : " + error.message )
    }
};


export const { setProfile, resetProfile } = profileSlice.actions;

export default profileSlice.reducer;