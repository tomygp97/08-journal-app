import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassowrd, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers");

describe('Tests in auth/thunks', () => {

    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('should invoke checkingCredentials', async() => {
        await checkingAuthentication()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
 
    });

    test('signInWithGoogle should call checkingCredentials and login - success', async() => {

        const loginData ={ ok: true, ...demoUser }

        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('signInWithGoogle should call checkingCredentials and logout - failure', async() => {

        const loginData ={ ok: false, errorMessage: "Un error de Google" }

        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

    });

    test('loginWithEmailPassword should call checkingCredentials and login - success', async() => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: "123456" };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassowrd( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );


    });


    test('loginWithEmailPassword should call checkingCredentials and logout - failure', async() => {

        const loginData = { ok: false, errorMessage: "Un error de password" };
        const formData = { email: demoUser.email, password: "123456" };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassowrd( formData )( dispatch );

        // console.log(loginData.errorMessage);
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );


    });

    test('startLogout should call logoutFirebase, clearNotes and logout', async() => {

        await startLogout()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );

    })

});