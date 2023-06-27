import React, { useState } from "react";
import axios from "axios";
import { Button, Paper, TextField, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import validate from "./form.validate";

const Form = ({ fetch }) => {
  const [pensamientos, setPensamientos] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (valores,formikBag) => {
    setPensamientos(false);
    setLoading(true);

    const data = new FormData();

    data.append('pensamiento', valores.pensamiento);
    data.append('imagen', valores.imagen);

    try {
      await axios.post("http://localhost:7070/api/publicaciones", data, {
        withCredentials: true,
      });
      setPensamientos(200);

      fetch();
      formikBag.resetForm()
    } catch (e) {
      console.log("Error", e);
      if (e?.response?.status === 500) {
        setPensamientos(500);
      }
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      pensamiento: "",
      imagen: null,
    },
    validate,
    onSubmit: handleSubmit,
  });
  
  return (
    <Paper elevation={0} sx={{ mt: 4, p: 4, width: '100%', height: 250 }}>
      <form
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        style={{ height: "10" }}
      >
        <Grid
          container
          flexDirection="column"
          justifyContent="space-between"
          spacing={2}
          style={{ height: "100%" }}
        >
          <Grid xs={12}>
            <TextField
              height={800}
              fullWidth
              disabled={loading}
              id="outlined-multiline-static"
              multiline
              rows={4}
              name="pensamiento"
              label="pensamiento"
              value={formik.values.pensamiento}
              onChange={formik.handleChange}
              error={
                formik.touched.pensamiento && Boolean(formik.errors.pensamiento)
              }
              helperText={
                formik.touched.pensamiento && formik.errors.pensamiento
              }
            />
          </Grid>
          <input 
            type="file" 
            name="imagen" 
            placeholder="Ingresa una Imagen"
            onChange={(e) => {
              formik.setFieldValue("imagen", e.currentTarget.files[0]);
            }}
          />

          <Grid container spacing={2} xs={12}>
            <Grid container justifyContent="center" xs={12}>
              <Button disabled={loading} type="submit" color="inherit">
                Publicar
              </Button>
            </Grid>

            {pensamientos === 200 && (
              <Grid xs={12} textAlign="center">
                <Box color="success.main">Publicación Creada</Box>
              </Grid>
            )}

            {pensamientos === 500 && (
              <Grid xs={12} textAlign="center">
                <Box color="error.main">Error al Crear la Publicación</Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Form;
