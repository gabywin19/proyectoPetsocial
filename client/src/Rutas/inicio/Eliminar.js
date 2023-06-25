import React from 'react';
import axios from 'axios';
import {MenuItem} from '@mui/material';



const Eliminar= ({ id, refresh }) => {
  
  
  const deletePublicaciones = async() => {
    try {
      await axios.delete("http://localhost:7070/api/publicaciones/"+ id, { withCredentials: true });

      refresh();
    } catch (e) {
      console.log('Error', e);
    }

  };
  
  return (
    <MenuItem onClick={(e) => deletePublicaciones()}>Eliminar</MenuItem>
  )
};

export default Eliminar;
