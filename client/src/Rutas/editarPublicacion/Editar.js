import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FormEdit from './FormEdit';

const Editar=()=>{
    const [editar, setEditar] = useState({});
    let { id } = useParams();

    useEffect(() => {
        const edit = async () => {
          try {
            const res = await axios.get("http://localhost:7070/api/publicaciones/" + id, { withCredentials: true } );
  
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
        {(editar === null) && (<span>No hay publicacion para Editar</span>)}
        {editar?._id && (
          <FormEdit editar={editar}/>
        )}
    </div>
  );
};

export default Editar;
  