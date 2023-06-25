import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, Paper, Link, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import validate from "./form.validate";
import InputsComponents from "./InputsComponents";
import Response from './Response';
import PetSocial from '../../imagenes/PetSocial.png'

const Login = () => {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (valores) => {
    setLogin(false);
    setLoading(true);
    try {
      await axios.post("http://localhost:7070/api/login", valores, {
        withCredentials: true
      });
      setLogin(200);

      navigate('/');
    } catch (e) {
      console.log("Error", e);
      if (e?.response?.status === 403) {
        setLogin(403);
      } else {
        setLogin(500);
      }
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: handleSubmit,
  });

  return (
    <main>
      <Grid container justifyContent='center'>
        <Paper elevation={0} sx={{mt: 4, p: 4, width: 600, height:500}}>
          <form onSubmit={formik.handleSubmit} autoComplete="off" style={{height: '100%'}}>
            <Grid container flexDirection='column' justifyContent='space-between' spacing={2} style={{height: '100%'}}>
              <Grid container justifyContent='center' alignItems='center'><img src={PetSocial} alt='Logo' width="400" height="80" /></Grid>
              
              <Typography variant='h3' textAlign='center'>
                Iniciar sesión
              </Typography>
             
              <InputsComponents formik={formik} loading={loading} />
              
              <Grid container spacing={2} xs={12}>
                <Grid container justifyContent="center" xs={12}>
                  <Button disabled={loading} type="submit" color="inherit">
                    Iniciar Sesion
                  </Button>
                </Grid>
                <Grid container justifyContent="center" xs={12}>
                  <Link component={NavLink} to='/register'>
                    Registrate
                  </Link>
                </Grid>

                <Response login={login} />
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </main>
  )
}

export default Login;