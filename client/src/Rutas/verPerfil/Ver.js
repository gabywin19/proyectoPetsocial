import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box } from '@mui/material';
import VerPublicaciones from '../verPerfil/VerPublicaciones';

const Ver=()=>{
    const [editar, setEditar] = useState([]);
   

    useEffect(() => {
      const vista = async () => {
        try {
          const res = await axios.get("http://localhost:7070/api/usuario", { withCredentials: true } );

          setEditar(res.data);
        } catch (e) {
          console.log('Error', e);
          setEditar(null);
        }
      }

      vista()
        // eslint-disable-next-line
    }, []);

  return(
    <Box component='main' sx={{my: 4}}>
        {!editar?._id && (<Box textAlign='center'>Cargando...</Box>)}
        {(editar === null) && (<span>No Hay Perfil para Editar</span>)}
        {editar?._id && (
          <VerPublicaciones editar={editar} />
        )}
    </Box>
  );
};

export default Ver;