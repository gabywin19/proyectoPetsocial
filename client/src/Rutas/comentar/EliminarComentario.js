import React from 'react'
import axios from 'axios';
import {Button} from "@mui/material";

const EliminarComentario = ({id, refresh}) => {
    const deletePublicaciones = async() => {
        try {
          await axios.delete("http://localhost:7070/api/comentarios/"+ id, { withCredentials: true });
    
          refresh()
        } catch (e) {
          console.log('Error', e);
        }
    
      };
      
      return (
        <Button onClick={(e) => deletePublicaciones()}>Eliminar</Button>
      )
}

export default EliminarComentario