import React, { useEffect, useState } from "react";
import {Typography,Box,Avatar,Menu,MenuItem,IconButton,Card,CardHeader,CardContent,CardActions,CardMedia,Collapse} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate, NavLink } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import AddCommentIcon from '@mui/icons-material/AddComment';
import Eliminar from "../inicio/Eliminar";
import EliminarComentario from "../comentar/EliminarComentario";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const Post = ({ datos, refresh }) => {
  const [comentar, setComentar] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleComments = () => {
    setComentar((value) => !value);
  };
  const ruta = datos.imagen?.path
  const post = ruta?.split('\\').slice(-1)[0]

  const ruta2 = datos.usuario?.imagen?.path
  const avatar = ruta2?.split('\\').slice(-1)[0]

  return (
    <Card elevation={0}>
      <CardHeader
        sx={{bg: (theme) => theme.palette.primary.main}}
        avatar={
          <Avatar
            sx={{ mr: 2 }}
            src={`http://localhost:7070/${avatar}`}
            alt={datos.usuario?.imagen?.originalname}
          >
            {datos?.usuario?.petName[0]}
          </Avatar>
        }
        action={
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={datos?.usuario?.petName}
      />
      <CardContent>
        <Typography variant="body1">
          {datos.pensamiento}
        </Typography>
      </CardContent>
      {post && (
        <CardMedia
          component={datos.imagen.mimetype === 'video/mp4' ? 'video' : "img"}
          controls
          height="auto"
          sx={{objectFit:'contain',width:"100%",maxHeight:"90vh"}}
          image={`http://localhost:7070/${post}`}
          alt={datos.imagen.originalname}
        />
      )}
      <CardActions disableSpacing>
        <IconButton
          to={"/comentarios/" + datos._id}
          component={NavLink}
        >
          <AddCommentIcon />
        </IconButton>
        <IconButton
          onClick={() => handleComments()}
          sx={{ml: 'auto'}}
        >
          <CommentIcon />
        </IconButton>
      </CardActions>
      <Collapse in={comentar} timeout="auto" unmountOnExit>
        <CardContent>
        {datos.comentarios?.map((item, i) => (
          <Typography key={i}>
            {item.comentario}
            <EliminarComentario id={item._id} refresh={refresh}/>
          </Typography>
        ))}
        {!datos.comentarios.length && (
          <Typography>No hay comentarios disponibles...</Typography>
        )}
        </CardContent>
      </Collapse>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleEdit(datos._id)}>Editar</MenuItem>
        <Eliminar id={datos._id} refresh={refresh} />
      </Menu>
    </Card>
  );
};

const Renderizar = ({ view, fetch }) => {
  useEffect(() => {
    fetch();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {view?.length <= 0 && (
        <Box sx={{ mt: 4 }} textAlign="center">
           <Typography>No hay Publicación Para Mostrar</Typography>
        </Box>
      )}

      {view === null && (
        <Box sx={{ mt: 4 }} textAlign="center">
          <Typography>No hay Publicación Para Mostrar</Typography>
        </Box>
      )}
      <Grid container spacing={4}>
        {view?.map((datos, i) => {
          return (
            <Grid xs={12} key={i}>
              <Post datos={datos} refresh={fetch} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Renderizar;
