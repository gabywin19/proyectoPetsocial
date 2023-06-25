const validate = (valores)=>{
    let errores={};
    
    // eslint-disable-next-line
    if( ! (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(valores.email))){
        errores.email= 'Correo Invalido';
    }else if (!valores.email) {
        errores.email = 'Required';
    } 

    if(valores.password.length < 8){
        errores.password= 'La Contraseña debe tener Minimo 8 Carácteres';
    }else if (!valores.password) {
        errores.password = 'Required';
    } 

    return errores;
}

export default validate;