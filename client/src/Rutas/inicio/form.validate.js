const validate = (valores)=>{
    let errores={};
     if (!valores.pensamiento) {
        errores.pensamiento = 'Required';
    } 

   

    return errores;
}

export default validate;