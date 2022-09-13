import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { startGoogleSignIn, startLoginWithEmailPassowrd } from "../../store/auth";


const formData = {
  email: "",
  password: "",
 }

export const LoginPage = () => {

  const { email, password, onInputChange } = useForm( formData );

  const { status, errorMessage } = useSelector( state => state.auth );

  const dispatch = useDispatch();

  const isAuthenticating = useMemo( () => status === "checking", [status] )

  const onSubmit = ( event ) => {
    event.preventDefault();

    // dispatch( checkingAuthentication() );
    dispatch( startLoginWithEmailPassowrd({ email, password }) ); //! Llamar Thunk, el provider NO
  };

  const onGoogleSignIn = ( event ) => {
    event.preventDefault();
    dispatch( startGoogleSignIn() );
  };

  return (

    <AuthLayout title="Login">

       
      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster" >
        <Grid container>
          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }
              />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              name="password"
              value={ password }
              onChange={ onInputChange }
              />
          </Grid>

          <Grid container
            spacing={ 2 }
            sx={{ mg: 2, mt: 1 }}
          >
            
            <Grid container>
              <Grid item xs={ 12 } display={ !!errorMessage ? "" : "none" }>
                <Alert severity="error">{ errorMessage }</Alert>
              </Grid>
            </Grid>

            <Grid item xs={ 12 } sm={ 6 }>
    
              <Button 
                disabled={ isAuthenticating }  
                type="submit" 
                variant="contained" 
                fullWidth
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={ 12 } sm={ 6 }>
              <Button 
                disabled={ isAuthenticating }
                variant="contained" 
                fullWidth
                onClick={ onGoogleSignIn }
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>

          </Grid>

          <Grid container direction="row" justifyContent="end" sx={{ mt: 1 }}>
            <Link component={ RouterLink } color="inherit" to="/auth/register">
            Crear una cuenta
            </Link>
          </Grid>

        </Grid>
      </form>
        
    </AuthLayout>

  )
}
