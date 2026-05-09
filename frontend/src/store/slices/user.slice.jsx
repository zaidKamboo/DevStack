import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast"
import backendHost from "../../api";
import { LOGIN_ROUTE, SIGNUP_ROUTE, LOGOUT_ROUTE } from "../../utils";

const initialState = {};

const userSlice = createSlice( {
  name: "user",
  initialState,
  reducers: {
    setUser: ( _, { payload } ) => payload,
    resetUser: () => initialState,
  },
} );

export const signup = ( data, navigate ) => ( dispatch ) => {
  try {
    backendHost.post( SIGNUP_ROUTE, data, { withCredentials: true } )
      .then( ( res ) => {
        const { user, message } = res.data;
        console.log( res );
        dispatch( setUser( user ) );
        toast.success( message )
        navigate( '/' )
      } )
      .catch( err => {
        console.log( err.response.data )
        toast.error( "Signup ERROR " + err.response.data.message )
      } )
  } catch ( error ) {
    console.log( "Signup ERROR " + error )
    toast.error( "Signup error : " + error.message )
  }
};
export const login = ( data, navigate ) => ( dispatch ) => {
  try {
    backendHost.post( LOGIN_ROUTE, data, { withCredentials: true } )
      .then( ( res ) => {
        const { user, message } = res.data;
        console.log( user, message );
        dispatch( setUser( user ) );
        toast.dismiss();
        toast.success( message )
        navigate( '/' )
      } )
      .catch( err => {
        console.log( err.response.data )
        toast.dismiss();
        toast.error( "Login ERROR " + err.response.data.message )
      } )
  } catch ( error ) {
    console.log( "Login ERROR " + error )
    toast.dismiss();
    toast.error( "Login error : " + error.message )
  }
};
export const logout = ( navigate ) => ( dispatch ) => {
  try {
    backendHost.post( LOGOUT_ROUTE, {}, { withCredentials: true } )
      .then( ( res ) => {
        const { user, message } = res.data;
        console.log( user, message );
        dispatch( setUser( user ) );
        toast.dismiss();
        toast.success( message )
        navigate( '/' )
      } )
      .catch( err => {
        console.log( err.response.data )
        toast.dismiss();
        toast.error( "Logout ERROR " + err.response.data.message )
      } )
  } catch ( error ) {
    console.log( "Logout ERROR " + error )
    toast.dismiss();
    toast.error( "Logout error : " + error.message )
  }
};

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;