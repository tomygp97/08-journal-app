import { collection, deleteDoc, doc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, startNewNote } from "../../../src/store/journal"

describe('Tests in journal/thunks', () => {
    jest.setTimeout(500); //! Agregar mas tiempo para el test

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('startNewNote should create  new note', async() => {

        const uid = "TEST-UID";

        getState.mockReturnValue({ auth: { uid: uid } })

        await startNewNote()( dispatch, getState )

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            body: "",
            title: "",
            id: expect.any( String ),
            date: expect.any( Number ),
        }) );
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body: "",
            title: "",
            id: expect.any( String ),
            date: expect.any( Number ),
        }) );

        // Borrar de firebase
        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );
        const docs = await getDocs( collectionRef );

        const deletePromises = []
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );

        await Promise.all( deletePromises );
        // Fin borrar de firebase

    })


})