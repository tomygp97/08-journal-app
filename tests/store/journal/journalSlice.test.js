import { journalSlice, savingNewNote } from "../../../src/store/journal"
import { initialState } from "../../fixtures/authFixtures"


//TODO: Hacer testing a todas los reducers para practicar (igual a authSlice.test.js)
describe('Tests in journalSlice', () => {


    test('should return initialState and be called journal', () => {

        const state = journalSlice.reducer( initialState, {} );

        expect( state ).toEqual( initialState );
        expect( journalSlice.name ).toBe("journal");

    });


    test('savingNewNote should change isSaving to true', () => {

        const state = journalSlice.reducer( initialState, savingNewNote() )

        expect( state.isSaving ).toBeTruthy();

    });


})