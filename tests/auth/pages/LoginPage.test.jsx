import { Provider } from "react-redux"
import { fireEvent, render, screen } from "@testing-library/react"
import { configureStore } from "@reduxjs/toolkit"
import { MemoryRouter } from "react-router-dom"

import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { authSlice } from "../../../src/store/auth"
import { notAuthenticatedState } from "../../fixtures/authFixtures"


const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock("../../../src/store/auth/thunks", () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassowrd: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password })
    },
}));

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});

describe('Tests in <LoginPage />', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('should show component correctly', () => {

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // screen.debug();

        expect( screen.getAllByText("Login").length ).toBeGreaterThanOrEqual(1);

    });

    test('google button should call startGoogleSignIn', () => {

        
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText("google-btn");
        // console.log(googleBtn);
        fireEvent.click( googleBtn );

        expect( mockStartGoogleSignIn ).toHaveBeenCalled();

    });

    test('submit should call startLoginWithEmailPassowrd', () => {

        const email = "tomas@prueba.com";
        const password = "654321";

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole("textbox", { name: "Correo" });
        fireEvent.change( emailField, { target: { name: "email", value: email } } );
        
        const passwordField = screen.getByTestId("password");
        fireEvent.change( passwordField, { target: { name: "password", value: password } } );
        
        const loginForm = screen.getByLabelText("submit-form");
        fireEvent.submit( loginForm );

        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
            email,
            password
        });

    });



})