const validate = (valores)=>{
    let errores={};
   
     
    // eslint-disable-next-line
    if( ! (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(valores.email))){
        errores.email= 'Correo Invalido';
    }else if (!valores.email) {
        errores.email = 'Required';
    } 

   

    if(valores.petName.length < 3){
        errores.petName= 'El Nombre de la Mascota debe tener Minimo 3 Carácteres';
    }else if (!valores.petName) {
        errores.petName = 'Required';
    } 

    if (!valores.petCategory) {
        errores.petCategory = 'Required';
    } 

    if(valores.petDescription.length < 3){
        errores.petDescription= 'La Descripción de la Mascota debe tener Minimo 3 Carácteres';
    }else if (!valores.petDescription) {
        errores.petDescription = 'Required';
    } 

    if(valores.petType.length < 3){
        errores.petType= 'El tipo de Mascota debe tener Minimo 3 Carácteres';
    }else if (!valores.petType) {
        errores.petType = 'Required';
    } 

    if (!valores.petPais) {
        errores.petPais = 'Required';
    } 



    

 return errores;
}

export default validate;