import { createSlice } from '@reduxjs/toolkit';



export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: "",
        notes: [],
        active: null,
        //    active: {
        //     id: "ABC123",
        //     title: "",
        //     body: "",
        //     date: 1234567,
        //     imageUrls: [], //https://foto1.jpg, https://foto2.jpg,...
        //    }
    },
    reducers: { //! En los reducers nunca trabajo ASINCRONO, siempre sincrono
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },

        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },

        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.messageSaved = "";
        },

        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },

        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSaved = "";
        },

        updatedNote: ( state, action ) => { // payload: note
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                
                if ( note.id === action.payload.id ) {
                    return action.payload;
                }
                
                return note;
            });

            state.messageSaved = `${ action.payload.title }, actualizada correctamente`;

            //TODO: mostrar mensaje de actualizacion
        },

        setPhotosToActiveNote: ( state, action ) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        },

        clearNotesLogout: ( state ) => {
            state.isSaving = false;
            state.messageSaved = "";
            state.notes = [];
            state.active = null;
        },

        deleteNoteById: ( state, action ) => {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    savingNewNote,
    addNewEmptyNote, 
    setActiveNote, 
    setNotes, 
    setSaving, 
    updatedNote, 
    setPhotosToActiveNote,
    clearNotesLogout,
    deleteNoteById
} = journalSlice.actions;