import { signInWithGoogle, registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice";


export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
     
        dispatch( checkingCredentials() );
        // dispatch( checkingCredentials({
        //     status: "checking",
        // }) )
    };
};

export const startGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        if( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) )

    }
}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async ( dispatch ) => {

        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        if ( !ok ) return dispatch( logout({ errorMessage }) );

        dispatch( login({ uid, displayName, email, photoURL }) );

    }

}


export const startLoginWithEmailPassowrd = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        //? Forma 1 de hacerlo (problemas en el testing no reconoce el ok)

        // const { ok, uid, photoURL, errorMessage } = await loginWithEmailPassword({ email, password });
        // if ( !ok ) return dispatch( logout({ errorMessage }) );
        // dispatch( login({ ok, uid, email, photoURL }) );
        
        
        //? Forma 2 de hacerlo

        const result  = await loginWithEmailPassword({ email, password });
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );
        dispatch( login( result ) );

                
        // if ( ok ) return login({ uid, email, photoURL });
        // dispatch( logout({ errorMessage }) );  //! No funciona asi

    }
    
}


export const startLogout = () => {
    return async( dispatch ) => {
    await logoutFirebase();

    dispatch( clearNotesLogout() );
    dispatch( logout() );
    }
}