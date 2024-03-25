// React
import { useState, useEffect} from "react";
// Axios 
import axios from "axios";
// Redux
import { useSelector, useDispatch } from "react-redux";
// Router
import { useNavigate, Link} from "react-router-dom";

// Helpers
import PATHROUTES from "../../helpers/PathRoutes.helper";
import {
  validateName,
  validateDificultad,
  validateDuracion,
  validateTemporada,
  validateCountries,
} from './validations'; // Asegúrate de tener la ruta correcta

// Components
import Filter from "../../components/Filters/Filter";

// Actions 
import { getCountries, resetCountries } from "../../redux/actions"

// Styles
import styles from './Form.module.css';



const Form = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countryNames = useSelector((state) => {
    return state.countries.map((country) => country.name)
  },[]);

  const [values, setValues] = useState({
    
    name: "",
    dificultad: "",
    duracion: "",
    temporada: "",
    countries: [],
  });
  
  const [errors, setErrors] = useState({
    name: "",
    dificultad: "",
    duracion: "",
    temporada: "",
    continent: "",
    country: "",
  });
  const [formValid, setFormValid] = useState(false);
  
  useEffect(() => {
    dispatch(getCountries());
    dispatch(resetCountries());
  }, [dispatch]);
 
  useEffect(() => {
    const allFieldsFilled = Object.values(values).every((value) => {
      if (Array.isArray(value)) { return value.length > 0;
      } else { return value !== ""; } 
    });
    const noErrors = Object.values(errors).every((error) => !error);
    setFormValid(allFieldsFilled && noErrors);
  }, [values, errors ])
  

  
  //!
  const handleChange = (event) => {
    const { name, value } = event.target;
  
    const newError = validateField(name, value);
  
    setValues({
      ...values,
      [name]: value,
    });
  
    setErrors({
      ...errors,
      [name]: newError,
    });
  };
  
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return validateName(value);
      case 'dificultad':
        return validateDificultad(value);
      case 'duracion':
        return validateDuracion(value);
      case 'temporada':
        return validateTemporada(value);
      case 'continent':
      case 'country':
        return validateCountries(value);
      default:
        return false; 
    }
  };


  
  //!

    // const handleChange = (event) => {
    //   setValues({
    //     ...values,
    //     [event.target.name]: event.target.value,
    //   });

    //   const newErrors = { 
    //     name: validateName(values.name),
    //     dificultad: validateDificultad(values.dificultad),
    //     duracion: validateDuracion(values.duracion),
    //     temporada: validateTemporada(values.temporada),
    //     continent: validateCountries(values.countries),
    //     country: validateCountries(values.countries),
    //   };
    //  //hay errores? todos deberian ser false.
      
    //   setErrors(newErrors);

    //   const formValid = Object.values(newErrors).every(error => !error);
    //   //hay errores? todos deberian ser false, y every deberia devolver true. Y saltear mi condicion.
      
    //   if (!formValid) {
    //   //Si, hay errores, detengo la ejecucion.
    //     return;
    //   }
    // };
   

  const handleSelectChange = (event) => {
    const selectedCountries = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setValues({
      ...values,
      countries: selectedCountries,
    });
  };



//*SUBMIT
  const handleSubmit = async (event) => {
      event.preventDefault();

            const newErrors = { 
        name: validateName(values.name),
        dificultad: validateDificultad(values.dificultad),
        duracion: validateDuracion(values.duracion),
        temporada: validateTemporada(values.temporada),
        continent: validateCountries(values.countries),
        country: validateCountries(values.countries),
      };
     //hay errores? todos deberian ser false.
      
      setErrors(newErrors);

      const formValid = Object.values(newErrors).every(error => !error);
      //hay errores? todos deberian ser false, y every deberia devolver true. Y saltear mi condicion.
      
      if (!formValid) {
      //Si, hay errores, detengo la ejecucion.
        return;
      } 
   
    
    try {
      const response = await axios.post('http://localhost:3001/activities', values)
        const successfulMessage = `Se ha creado la nueva actividad turística: ${values.name}`;
        console.log(values)
        alert(successfulMessage);
        setValues({
          name: "",
          dificultad: "",
          duracion: "",
          temporada: "",
          countries: []
      });

      navigate(PATHROUTES.ACTIVITIES)
      
    } catch (error) {
      if (error.response && error.response.data) {

        alert("Hubo un error al crear la actividad.");
        // window.location.reload();
      }
      else console.error(error);
    }
  };
  
  // const handleFilterChange = (continent) => {
  //   console.log(`Cambió el continente a: ${continent}`);
  // };

  const handleFilterChange = (continent) => {
    dispatch(filterCountriesByContinent(continent))
  };


  return (
    <div className={styles.formDiv}>

      <div className={styles.contLink}>

      <Link to="/activities" className={styles.linkDiv} style={{ textDecoration: 'none', color: 'inherit'}}>
      <button type="submit" className={styles.btnLink}> Ver las actividades disponibles </button>
      </Link>
      <Link to="/updateactivities" className={styles.linkDiv} style={{ textDecoration: 'none', color: 'inherit'}}>
      <button type="submit" className={styles.btnLink}> Modificar actividades </button>
      </Link>
      <Link to="/formaddorremove" className={styles.linkDiv} style={{ textDecoration: 'none', color: 'inherit'}}>
      <button type="submit" className={styles.btnLink}> Agregar/Eliminar PAÍS de actividad</button>
      </Link>
      <Link to="/formRemoveActivity" className={styles.linkDiv} style={{ textDecoration: 'none', color: 'inherit'}}>
      <button type="submit" className={styles.btnLink}> Eliminar Actividad </button>
      </Link>
      <br /> <br /> <br /> <br />
      <Link to="/home" className={styles.linkDiv} style={{ textDecoration: 'none', color: 'inherit'}}>
      <button type="submit" className={styles.btnLink}> Volver al home 🔙</button>
      </Link>


      </div>


      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Crear actividad</h1>
        
        <label className={styles.label}>
          Nombre: <input className={styles.input} type="text" name="name" value={values.name} onChange={handleChange} placeholder="Ingresa nombre de la actividad" />
          {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
        </label>


        <label className={styles.label}>
          Dificultad: <input className={styles.input} type="number" name="dificultad" value={values.dificultad} onChange={handleChange} placeholder="Ingresa la dificultad"/>
          {errors.dificultad && <p className={styles.errorMessage}>{errors.dificultad}</p>}
        </label>


        <label className={styles.label}>
          Duracion (hs): <input className={styles.input} type="number" min="0" name="duracion" value={values.duracion} onChange={handleChange} placeholder="Ingresa la duración" />
          {errors.duracion && <p className={styles.errorMessage}>{errors.duracion}</p>}
        </label>


        Temporada: 
        <select className={styles.select} name="temporada" value={values.temporada} onChange={handleChange} >
            <option value="">Selecciona una temporada</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
          {errors.temporada && <p className={styles.errorMessage}>{errors.temporada}</p>}



        Continente:
        <Filter onChange={handleFilterChange} className={styles.selectForm}/>
        <label className={styles.label}>
        {errors.continent && <p className={styles.errorMessage}>{errors.continent}</p>}


        Países: (aprieta CTRL para seleccionar varios)
        <select className={styles.input} name="countries" multiple value={values.countries} onChange={handleSelectChange}>
            {countryNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>


        </label>


        <button type="submit" disabled={!formValid} className={styles.btnsubmit}>Crear actividad turística</button>
      </form>


    </div>
  )
}

export default Form;