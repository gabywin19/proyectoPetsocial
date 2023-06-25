import React from 'react'
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const Response = ({ login }) => {
    if (login === 200) {
      return (
        <Grid xs={12} textAlign="center">
          <Box color="success.main">Bienvenido</Box>
        </Grid>
      )
    }
  
    if (login === 403) {
      return (
        <Grid xs={12} textAlign="center">
          <Box color="error.main">Contraseña Incorrecta</Box>
        </Grid>
      )
    }

    if (login === 500) {
      return (
        <Grid xs={12} textAlign="center">
          <Box color="error.main">Error al Iniciar Sesión</Box>
        </Grid>
      )
    }
  
    
    return null;
  }

export default Response;
