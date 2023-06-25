const validate = (valores)=>{
    let errores={};
    if(valores.comentario.length < 3){
        errores.comentario= ' El Comentario debe tener Minimo 3 Carácteres';
    }
   

    return errores;
}

export default validate;