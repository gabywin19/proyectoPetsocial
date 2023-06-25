import React from 'react';
import axios from 'axios';
import { Button} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';


const CerrarSesion= ({ close }) => {
  const navigate = useNavigate();
  
  const deleteCookie = async() => {
    try {
      await axios.post("http://localhost:7070/api/logout", {}, { withCredentials: true });

      close();
      navigate('/login')
    } catch (e) {
      console.log('Error', e);
    }

  };
  
  return (
    <div>
      <Button  color="inherit" variant="text" endIcon={<LogoutIcon />} onClick={(e) => deleteCookie()}>Cerrar Sesión</Button>
     
    </div>
  )
};

export default CerrarSesion;
