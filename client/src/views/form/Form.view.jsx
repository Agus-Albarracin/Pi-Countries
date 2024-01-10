// React
import { useState } from "react";
// Axios 
import axios from "axios";
// Redux
import { useSelector } from "react-redux";
// Router
import { useNavigate } from "react-router-dom";

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
// Styles
import styles from './Form.module.css';



const Form = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    dificultad: "",
    duracion: "",
    temporada: "",
    countries: [],
  });

  const countryNames = useSelector((state) => state.countries.map((country) => country.name));

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

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

  const [errors, setErrors] = useState({
    name: "",
    dificultad: "",
    duracion: "",
    temporada: "",
    continent: "",
    country: "",
  });

    const handleSubmit = async (event) => {
      console.log(values);
      event.preventDefault();
    
      const newErrors = { 
        name: validateName(values.name),
        dificultad: validateDificultad(values.dificultad),
        duracion: validateDuracion(values.duracion),
        temporada: validateTemporada(values.temporada),
        continent: validateCountries(values.countries),
        country: validateCountries(values.countries),
      };
    
      setErrors(newErrors);
    
      const formValid = Object.values(newErrors).every(error => !error);
    
      if (!formValid) {
        return;
      }

    try {
      const response = await axios.post(
        'http://localhost:3001/activities',
        values
      )
      const successfulMessage = `Se ha creado la nueva actividad turística: ${values.name}`;
      alert(successfulMessage);
      setValues({
        name: "",
        dificultad: "",
        duracion: "",
        temporada: "",
        countries: []
      });
      navigate(PATHROUTES.HOME)
      
    } catch (error) {
      if (error.response && error.response.data) alert('Ya existe una actividad con ese nombre.');
      else console.error(error);
    }
  };

  const handleFilterChange = (continent) => {
    // Hacer algo con el cambio de continente, por ejemplo, actualizar el estado
    // o realizar cualquier acción necesaria en el componente Form
    console.log(`Cambió el continente a: ${continent}`);
  };

  return (
    <div className={styles.formDiv}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Nombre: <input className={styles.input} type="text" name="name" value={values.name} onChange={handleChange} placeholder="Ingresa nombre de la actividad" />
          {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
          
        </label>
        <label className={styles.label}>
          Dificultad: <input className={styles.input} type="number" min="1" max="5" name="dificultad" value={values.dificultad} onChange={handleChange} placeholder="Ingresa la dificultad"/>
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
        <button type="submit" className={styles.btn}>Crear actividad turística</button>
      </form>
    </div>
  )
}

export default Form;