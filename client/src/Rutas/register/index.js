import React, { useState } from "react";
import { useFormik } from "formik";
import validate from "./RegisterValidaciones";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Paper, Button , Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import InputsComponents from "./InputsComponents";
import Response from "./Response";
import PetSocial from "../../imagenes/PetSocial.png";

const MascotasRegister = () => {
  const [mascotas, setMascotas] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (valores) => {
    setMascotas(false);
    setLoading(true);
    const data = new FormData();

   data.append('imagen', valores.imagen);
   data.append('email', valores.email);
   data.append('password', valores.password);
   data.append('confirmPassword', valores.confirmPassword);
   data.append('petName', valores.petName);
   data.append('petCategory', valores.petCategory);
   data.append('petDescription', valores.petDescription);
   data.append('petType', valores.petType);
   data.append('petPais', valores.petPais);
    try {
      await axios.post("http://localhost:7070/api/register", data);
      setMascotas(200);
    } catch (e) {
      console.log("Error", e);
      if (e?.response?.status === 400) {
        setMascotas(400);
      } else {
        setMascotas(500);
      }
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      imagen:null,
      email: "",
      password: "",
      confirmPassword: "",
      petName: "",
      petCategory: "Perros",
      petDescription: "",
      petType: "",
      petPais: "",
    },
    validate,
    onSubmit: handleSubmit,
  });

  return (
    <main>
      <Grid container justifyContent="center">
        <Paper elevation={0} sx={{ mt: 4, p: 4, width: 600 }}>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container spacing={2}>
              <Grid container justifyContent="center" alignItems="center" xs={12}>
                <img src={PetSocial} alt="Logo" width="400" height="80" />
              </Grid>
              <Grid xs={12}>
              <Typography variant='h3' textAlign='center'>
                Registrate
              </Typography>
              </Grid>
             
              <InputsComponents formik={formik} mascotas={mascotas} />

              <Grid>
                <Grid container justifyContent="center" xs={12}>
                  <Button disabled={loading} type="submit" color="inherit">
                    Registrar Mascota
                  </Button>
                </Grid>

                <Grid container justifyContent="center" xs={12}>
                  <NavLink to="/">Iniciar Sesion</NavLink>
                </Grid>
                <Response mascotas={mascotas} />
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </main>
  );
};

export default MascotasRegister;
