import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import { Button, Box, Paper, TextField } from "@mui/material";
import validate from "./ComentarValidaciones";

const Comentar = () => {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  let { id } = useParams();

  const handleSubmit = async (valores) => {
    setLogin(false);
    setLoading(true);
    try {
      await axios.post("http://localhost:7070/api/comentarios/" + id, valores, {
        withCredentials: true,
      });
      setLogin(200);
    } catch (e) {
      console.log("Error", e);
      if (e?.response?.status === 500) {
        setLogin(500);
      }
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      comentario: "",
    },
    validate,
    onSubmit: handleSubmit,
  });

  return (
    <Box sx={{ mt: 4 }} component="main">
      <Grid container justifyContent="center">
        <Paper sx={{ p: 4, width: 400 }}>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container spacing={2}>
              <Grid xs={12}>
                <TextField
                  height={800}
                  fullWidth
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  name="comentario"
                  label="Comentario"
                  value={formik.values.comentario}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.comentario &&
                    Boolean(formik.errors.comentario)
                  }
                  helperText={
                    formik.touched.comentario && formik.errors.comentario
                  }
                />
              </Grid>

              <Grid container justifyContent="flex-end" xs={12}>
                <Button type="submit" color="inherit" disabled={loading}>
                  Comentar
                </Button>
              </Grid>

              {login === 200 && (
                <Grid xs={12} textAlign="center">
                  <Box color="success.main">Comentario con Exito</Box>
                </Grid>
              )}

              {login === 500 && (
                <Grid xs={12} textAlign="center">
                  <Box color="error.main">Error al Crear el Comentario</Box>
                </Grid>
              )}
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Box>
  );
};

export default Comentar;
