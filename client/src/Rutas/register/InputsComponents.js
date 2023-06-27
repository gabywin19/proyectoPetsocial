import React from "react";
import { TextField, MenuItem, Select, InputLabel } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const InputsComponents = ({ formik, loading }) => {
  return (
    <>
      <Grid>
      <label htmlFor="imagen">Seleccione Foto de Perfil: </label>
      <input 
        type="file" 
        name="imagen" 
        placeholder="Ingresa una Imagen"
        onChange={(e) => {
          formik.setFieldValue("imagen", e.currentTarget.files[0]);
        }}
      />
      </Grid> 
     
      <Grid xs={12}>
        <TextField
          fullWidth
          disabled={loading}
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>
      <Grid xs={12}>
        <TextField
          fullWidth
          disabled={loading}
          id="password"
          name="password"
          type="password"
          label="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </Grid>
      <Grid xs={12}>
        <TextField
          fullWidth
          disabled={loading}
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirmar Contraseña"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
      </Grid>
      <Grid xs={12}>
        <TextField
          fullWidth
          disabled={loading}
          id="petName"
          name="petName"
          label="Nombre de la Mascota"
          value={formik.values.petName}
          onChange={formik.handleChange}
          error={formik.touched.fitsname && Boolean(formik.errors.petName)}
          helperText={formik.touched.petName && formik.errors.petName}
        />
      </Grid>
      <Grid xs={12}>
        <InputLabel id="demo-simple-select-label">Categorias</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          disabled={loading}
          id="petCategory"
          name="petCategory"
          value={formik.values.petCategory}
          label="Categorias"
          onChange={formik.handleChange}
        >
          <MenuItem value="Perros">Perros</MenuItem>
          <MenuItem value="Gatos">Gatos</MenuItem>
          <MenuItem value="Aves">Aves</MenuItem>
          <MenuItem value="Rectiles">Rectiles</MenuItem>
          <MenuItem value="Insectos">Insectos</MenuItem>
          <MenuItem value="Bovinos">Bovinos</MenuItem>
          <MenuItem value="Peces">Peces</MenuItem>
          <MenuItem value="Exoticos">Exoticos</MenuItem>
          <MenuItem value="Otros">Otros</MenuItem>
        </Select>
      </Grid>
      <Grid xs={12}>
        <TextField
          fullWidth
          disabled={loading}
          type="string"
          id="petDescription"
          name="petDescription"
          label="Descripcion de la Mascota"
          value={formik.values.petDescription}
          onChange={formik.handleChange}
          error={
            formik.touched.petDescription &&
            Boolean(formik.errors.petDescription)
          }
          helperText={
            formik.touched.petDescription && formik.errors.petDescription
          }
        />
      </Grid>
      <Grid xs={12}>
        <TextField
          fullWidth
          disabled={loading}
          id="petType"
          name="petType"
          label="Tipo "
          value={formik.values.petType}
          onChange={formik.handleChange}
          error={formik.touched.petType && Boolean(formik.errors.petType)}
          helperText={formik.touched.petType && formik.errors.petType}
        />
      </Grid>
      <Grid xs={12}>
        <TextField
          fullWidth
          disabled={loading}
          id="petPais"
          name="petPais"
          label="País"
          value={formik.values.petPais}
          onChange={formik.handleChange}
          error={
            formik.touched.petPais && Boolean(formik.errors.petPais)
          }
          helperText={formik.touched.petPais && formik.errors.petPais}
        />
      </Grid>
    </>
  );
};

export default InputsComponents;
