import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updatedNote, setPhotosToActiveNote, deleteNoteById } from "./";


export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );
        
        const { uid } = getState().auth;
        
        const newNote = {
            title: "",
            body: "",
            date: new Date().getTime(),
        }
        
        // Referencia al documento
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        await setDoc( newDoc, newNote );  // setDoc( referencia donde lo quiero insertar, objeto que voy a grabar )
        
        newNote.id = newDoc.id;
        
        //! dispatch
        // dispatch( newNote )
        //dispatch ( activarNote )
        
        dispatch( addNewEmptyNote( newNote ) );  //! despacho la accion addNewEmptyNote con el payload newNote
        dispatch( setActiveNote( newNote ) );
    }
}


export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        if ( !uid ) throw new Error( "El UID del usuario no existe" );

        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ) );

    }
}

export const startSavingNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await setDoc( docRef, noteToFireStore, { merge: true } ) // si hay campos en el primero y en el segundo no, los campos del primero se mantienen

        dispatch( updatedNote( note ) );
    }
}


export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );

        const fileUploadPromises = [];
        for (const file of files) {
            
            fileUploadPromises.push( fileUpload( file ) ) //solo crea el arreglo de promesas, NO las dispara
            
        }

        const photosUrls = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote( photosUrls ) )

    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await deleteDoc( docRef );

        dispatch( deleteNoteById( note.id ) );

    }
}