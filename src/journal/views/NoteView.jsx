import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutline, SaveOutlined, Upcoming, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { ImageGallery } from "../components";
import { useForm } from "../../hooks";
import { setActiveNote, startUploadingFiles, startSavingNote, startDeletingNote } from "../../store/journal";


export const NoteView = () => {

    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );

    const { date, body, title, onInputChange, formState } = useForm( note );

    const dateString = useMemo( () =>  {  // usamos useMemo por que la fecha no cambia mucho pero el formulario si
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {

        dispatch( setActiveNote( formState ) )

    }, [formState])


    useEffect(() => {

        if ( messageSaved.length > 0 ) {
            Swal.fire("Nota actualizada", messageSaved, "success");
        }

    }, [messageSaved])


    const onSaveNote = () => {
        dispatch( startSavingNote() );
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;
        console.log("subiendo archivos");

        dispatch( startUploadingFiles( target.files ) )
    }

    const onDelete = () => {
        // dispatch( startDeletingNote() );
        
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch( startDeletingNote() );
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
          })
    }
    

  return (

    <Grid 
        container 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{ mb: 1 }}
        className="animate__animated animate__fadeIn animate__faster"
    >
        <Grid>
            <Typography fontSize={ 39 } fontWeight="light">{ dateString }</Typography>
        </Grid>
        <Grid item>

            <input
                type="file"
                multiple
                ref={ fileInputRef }
                onChange={ onFileInputChange }
                style={{ display: "none" }}
            />

            <IconButton 
                color="primary" 
                disabled={ isSaving }
                onClick={ () => fileInputRef.current.click() }
            >
               <UploadOutlined /> 
            </IconButton>

            <Button
                disabled={ isSaving }
                color="primary" 
                sx={{ padding: 2 }}
                onClick={ onSaveNote }
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Save
            </Button>
        </Grid>
        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Insert Title"
                label="Title"
                sx={{ border: "none", mb: 1 }}
                name="title"
                value={ title }
                onChange={ onInputChange }
            />
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="What happend today?"
                minRows={ 5 }
                name="body"
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>

        <Grid container justifyContent="end">
            <Button
                disabled={ isSaving }
                onClick={ onDelete }
                sx={{ mt: 2 }}
                color="error"
            >
                <DeleteOutline />
                Delete
            </Button>
        </Grid>

        <ImageGallery images={ note.imageUrls }/>

    </Grid>

  )
}
