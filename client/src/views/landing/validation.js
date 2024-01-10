export default (data) => {

    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let errors = {};
    if(!data.email.includes('@')){
        errors.e1 = "Email no valido."
    }
    if (!data.email || !data.email.endsWith('.com')) {
       errors.e4 = "El email debe terminar en .com"
    }
    if (!data.email || !/(hotmail|gmail|outlook)\.com$/i.test(data.email)) {
        errors.e5 = 'Por favor, ingresa un correo electrónico válido de Hotmail, Gmail u Outlook que termine en .com'
    }
    if(!data.email){
        errors.e2 = "Ingrese Email."
    }
    if(data.email.length > 35){
        errors.e3 = "Debe ser menor a 35 caracteres."
    }

    // if(!/\d/.test(data.password)){
    //     errors.p1 = "Al menos debe tener un numero"
    // }
    
    // if (!regex.test(data.password)){
    //     errors.p3 = "Debe contener al menos un caracteres especial"
    // }
    
    // if(data.password.length < 6) {
    //     errors.p2 = "Debe tener al menos 6 caracteres"
    // }

    return errors;
}