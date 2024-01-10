// Router
import { Link, useNavigate } from "react-router-dom";
// React
import { useState, useEffect } from 'react';
// Styles
import styles from './Landing.module.css'
// Helpers
import PATHROUTES from '../../helpers/PathRoutes.helper'
import validation from "./validation";
import {show, notshow }from "./icons";
// Img
import video from "../../views/Landing/planet.mp4"

const EMAIL = 'agus@gmail.com';
const PASSWORD = 'asd!123';

const disableEnterKey = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };


const Landing = () => {

    //funcion para ir pasando 1 a 1 los elementos de un array.
    // const textoBienvenida = ["Bienvenido", "Welcome", "ようこそ", "Benveuto", "환영", "Bem-vindo", "受欢迎", "Willkommen", "Bienvenu", "مَرْحَباً", "добро пожаловать"]
    // const [ textoIndex, setTextoIndex ] = useState(0);
    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setTextoIndex((prevIndex) => (prevIndex + 1) % textoBienvenida.length);
    //     }, 2000);
    //     return () => clearInterval(intervalId);
    // }, [textoBienvenida])



    //FORMULARIO
    //  SIMULADOR DE LOGIN ULTRABASICO.
    const [access, setAccess] = useState(false);
    const navigate = useNavigate();

    const login = (userData, event) => {
    if (userData.password === PASSWORD && userData.email === EMAIL) {
       setAccess(true);
       navigate('/home');

    }if (userData.password.length !== 0 &&  userData.password !== PASSWORD ||
         userData.email.length !== 0 && userData.email !== EMAIL){
        window.alert("Los datos son invalidos")
        setAccess(false)
         }

}
 
const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
      
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };


    const [userData, setUserData] = useState({
        email: "",
        password:""
    });
    
    
    
    const handleChange = (event) =>{
        setUserData({ ...userData,[event.target.name]: event.target.value})
        setErrors(validation({...userData, [event.target.name]: event.target.value}))
    }

    


//* Seteo de errores y envio de formulario.
    const [errors, setErrors] = useState({});
    const handleSubmit = (event) =>{
        
        event.preventDefault();
           //validar si la contraseña tiene al menos 6 caracteres
        if (userData.password.length < 6) {
            setErrors({ ...errors, p1: "La contraseña debe tener al menos 6 caracteres" });
            return; // Detener el proceso si la contraseña es demasiado corta
          }
          // Validar si la contraseña contiene al menos un dígito numeral
        if (!/\d/.test(userData.password)) {
            setErrors({ ...errors, p1: "La contraseña debe contener al menos un número" });
            return; // Detener el proceso si no hay ningún número en la contraseña
        }
        // Validar si la contraseña contiene al menos un carácter especial
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(userData.password)) {
           setErrors({ ...errors, p1: "La contraseña debe contener al menos un carácter especial" });
           return; // Detener el proceso si no hay ningún carácter especial en la contraseña
        }
        //Si pasa la validacion continuar con el inicio de sesion
        login(userData)
    }

    useEffect(() => {
        document.addEventListener('keydown', disableEnterKey);
        return () => {
          document.removeEventListener('keydown', disableEnterKey);
        };
      }, []);

    return (
        <div className={styles.body}>
            <video className={styles.video} muted autoPlay loop src={video}>
            </video>
            <div className={styles.textDiv}>
            <h1 className={styles.changinTitle}> ¡¡¡Bienvenidos!!! </h1>
            {/* <h1 className={styles.changinTitle}>{textoBienvenida[textoIndex]}</h1> */}
            
            <form>
                <label htmlFor="email"></label>
                    <input
                    className={styles.email}
                    placeholder="Ingrese su email"
                     value={userData.email}
                     onChange={handleChange}
                     type="text" 
                     name="email"
                    />
                    {errors.e1 ? <p className={styles.errors}>{errors.e1}</p> : 
                     errors.e2 ? <p className={styles.errors}>{errors.e2}</p> :
                     errors.e3 ? <p className={styles.errors}>{errors.e3}</p> :
                     errors.e5 ? <p className={styles.errors}>{errors.e5}</p> :
                                 <p className={styles.errors}>{errors.e4}</p>
                                 }

                <label htmlFor="password"></label>
                    <input  
                    className={styles.password}
                    placeholder="Ingrese una contraseña"                    
                     value={userData.password}
                    //  onChange={handleChange}
                     onChange={handleInputChange}


                    //  type="password"
                     type={showPassword ? 'text' : 'password'} // Cambia el tipo de input
                     name="password"
                    />
                   <button
                    className={styles.showPasswordButton} onClick={(event) => togglePasswordVisibility(event)}>
                    {showPassword ? <img src={notshow} alt="Not show password" className={styles.iconsp}/> :
                     <img src={show} alt="Show password" className={styles.iconsp} />}
                   </button>
                     {errors.p1 ? <p className={styles.errors}>{errors.p1}</p> : null }

                    <br />
                
                <button 
                className={styles.btn}
                type="submit"
                onClick={handleSubmit}
                >Ingresa a la aplicación</button>


            </form>


                {/* <Link to={PATHROUTES.HOME}>
                    <button className={styles.btn}>&nbsp;&nbsp;&nbsp;Ingresa a la aplicación&nbsp;&nbsp;&nbsp;</button>
                </Link> */}
            </div>
           
            
        </div>
    )
}

export default Landing;