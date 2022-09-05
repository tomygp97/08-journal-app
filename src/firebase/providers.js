import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {

    try{
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }


    } catch (error) {
        
    const errorCode = error.code;
    const errorMessage = error.message;
    

        return {
            ok: false,
            errorMessage,
        }
    }

}


export const registerUserWithEmailPassword =  async({ email, password, displayName }) => {

    try{
        // console.log({ email, password, displayName });

        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;
        // TODO: actualizar displayName en Firebase
        updateProfile( FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid, photoURL, email, displayName
        }


    } catch( error ) {
        return {
            ok: false,
            errorMessage: error.message,
        }
    }

}


export const loginWithEmailPassword = async({ email, password }) => {

    //! signInWithEmailAndPassword
    try{
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user
        // console.log(resp);

        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch( error ) {
        return{
            ok: false,
            errorMessage: error.message,
        }

    }
    //! Similar a la de arriba pero sin llamar a updateProfile

    //! En login hacer dispatch del thunk

    //! El thunk internamente va a llamar a esta funcion 
    //! dependiendo de lo que regrese esta funcion se despacha el logout o el login


}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}