import React from "react";

// MUI
import { TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const InputsComponents = ({ formik, loading }) => {
  return (
    <>
      <Grid xs={12}>
        <TextField
          fullWidth
          disabled={loading}
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={
            formik.touched.email && Boolean(formik.errors.email)
          }
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
          error={
            formik.touched.password && Boolean(formik.errors.password)
          }
          helperText={
            formik.touched.password && formik.errors.password
          }
        />
      </Grid>
    </>
  );
};

export default InputsComponents;