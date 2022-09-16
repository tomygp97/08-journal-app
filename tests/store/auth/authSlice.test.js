import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Tests in authSlice', () => {

    test('should return initialState and be called "auth"', () => {
 
        const state = authSlice.reducer( initialState, {} );
        
        expect( state ).toEqual( initialState );
        expect( authSlice.name ).toBe("auth");

    });

    test('should login user', () => {

        // console.log( login(demoUser) );  //login pide el payload que es el usuario
        const state = authSlice.reducer( initialState, login( demoUser ) );
        // console.log(state);

        expect( state ).toEqual({
            status: "authenticated",
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });

    });

    test('should logout user without error message', () => {

        // console.log( login(demoUser) );  //login pide el payload que es el usuario
        const state = authSlice.reducer( authenticatedState, logout() );
        // console.log(state);

        expect( state ).toEqual({
            status: "not-authenticated",
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        });

    });

    test('should logout user with error message', () => {

        const errorMessage = "Credenciales no son correctas";
        // console.log( login(demoUser) );  //login pide el payload que es el usuario
        const state = authSlice.reducer( authenticatedState, logout( { errorMessage } ) );
        // console.log(state);

        expect( state ).toEqual({
            status: "not-authenticated",
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage,
        });

    });

    test('should change state to checking', () => {

        const state = authSlice.reducer( authenticatedState, checkingCredentials() );

        expect( state.status ).toBe("checking");

    });

})