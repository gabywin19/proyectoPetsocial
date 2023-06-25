import React from "react";
import {Container,Box,Avatar,Divider,Typography,} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Post } from "./../inicio/Renderizar";

const VerPublicaciones = ({ editar }) => {
  const ruta = editar.imagen?.path
  const avatar = ruta?.split('\\').slice(-1)[0]

  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid
            display="flex"
            justifyContent={{ xs: "center", md: "flex-start" }}
            xs={12}
            md="auto"
          >
            <Avatar src={`http://localhost:7070/${avatar}`}
            alt={editar.imagen?.originalname} sx={{ width: 100, height: 100 }}>R</Avatar>
          </Grid>
          <Grid container xs={12} md="auto">
            <Grid
              display="flex"
              justifyContent={{ xs: "center", md: "flex-start" }}
              xs={12}
            >
              <Typography variant="h4">{editar.petName}</Typography>
            </Grid>
            <Grid
              display="flex"
              justifyContent={{ xs: "center", md: "flex-start" }}
              xs={6}
            >
              <Typography>Categoria: {editar.petCategory}</Typography>
            </Grid>
            <Grid
              display="flex"
              justifyContent={{ xs: "center", md: "flex-start" }}
              xs={6}
            >
              <Typography>Descripción: {editar.petDescription}</Typography>
            </Grid>
            <Grid
              display="flex"
              justifyContent={{ xs: "center", md: "flex-start" }}
              xs={6}
            >
              <Typography>Tipo: {editar.petType}</Typography>
            </Grid>
            <Grid
              display="flex"
              justifyContent={{ xs: "center", md: "flex-start" }}
              xs={6}
            >
              <Typography>País: {editar.petPais}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Divider sx={{ my: 4 }} />
      <Container>
        <Grid container spacing={2}>
          {editar.publicaciones &&
            editar.publicaciones.map((datos, i) => {
              return (
                <Grid xs={12} key={i}>
                  <Post datos={datos} refresh={() => {}} />
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </Box>
  );
};

export default VerPublicaciones;
