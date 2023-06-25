import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { Button, Box, Paper, TextField } from '@mui/material';
import validate from '../inicio/form.validate'

const FormEdit = ({editar}) => {
    const[formularioEnviado, setFormularioEnviado] = useState(false);
  
  const handleSubmit = async (valores) => {
    try {
      const res = await axios.put('http://localhost:7070/api/publicaciones/'+ editar._id ,valores,{ withCredentials: true });

      console.log(res.data.message);
      setFormularioEnviado(200);
    } catch (e) {
      console.log('Error', e);
      setFormularioEnviado(500);
    }
  };

  const formik = useFormik({
    initialValues: {
        pensamiento: editar.pensamiento
       
    },
    validate,
    onSubmit: handleSubmit,
  });

    return (
        <Box sx={{mt: 4,}} component='main'>
            <Grid container justifyContent='center'>
                <Paper sx={{p: 4, width: 400}}>
                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                        <Grid container spacing={2}>
                            <Grid xs={12}>
                                <TextField
                                height={800}
                                fullWidth
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

                            <Grid container justifyContent='flex-end' xs={12}>
                                <Button type='submit' color='inherit'>Actualizar</Button>
                            </Grid>

                            {(formularioEnviado === 200) && (
                            <Grid xs={12} textAlign='center'>
                                <Box color='success.main'>Pensamiento Actualizado</Box>
                            </Grid>
                            )}

                            {(formularioEnviado === 500) && (
                            <Grid xs={12} textAlign='center'>
                                <Box color='error.main'>Error al Actualizar el Pensamiento</Box>
                            </Grid>
                            )}
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Box>
    );
}

export default FormEdit;