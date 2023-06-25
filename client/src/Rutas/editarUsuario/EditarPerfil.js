import React, { useEffect, useState } from 'react'
import axios from 'axios';

import FormEdit from './FormEdit';

const EditarPerfil=()=>{
    const [editar, setEditar] = useState({});
   

    useEffect(() => {
      const edit = async () => {
        try {
          const res = await axios.get("http://localhost:7070/api/usuario", { withCredentials: true } );

          setEditar(res.data);
        } catch (e) {
          console.log('Error', e);
          setEditar(null);
        }
      }

      edit()
        // eslint-disable-next-line
    }, []);

  return(
    <div>
      {!editar?._id && (<span>Cargando...</span>)}
      {(editar === null) && (<span>No Hay Perfil para Editar</span>)}
      {editar?._id && (
        <FormEdit editar={editar}/>
      )}
    </div>
  );
};

export default EditarPerfil;