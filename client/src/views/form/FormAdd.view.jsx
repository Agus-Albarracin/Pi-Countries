import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCountries, resetCountries, getActivities } from "../../redux/actions";

import Filters from "../../components/Filters/Filter";
import PATHROUTES from "../../helpers/PathRoutes.helper";

import {validateCountries, validateCountries2, validateContinent } from "./validations";
import styles from "./Form.module.css";


const FormAdd = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getActivities())
        dispatch(getCountries());
        dispatch(resetCountries());
      }, [dispatch]);
    
  const countryNames = useSelector((state) => state.countries.map((country) => country.name));
  const activityNames = useSelector((state) => state.activities.map((activity) => activity.name))

  const [values, setValues] = useState({
    name: "",
    selectedActivity: [],
    countries: [],
    continent: "",
  });

  const [errors, setErrors] = useState({
    continent: "",
    countries: "",
    selectedActivity: "",
  });

  const handleContinentChange = (continent) => {
    setValues({ ...values, continent });
    setErrors((prevErrors) => ({ ...prevErrors }));
  };


  const handleSelectCountryChange = (event) => {
    const selectedCountries = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setValues({
      ...values,
      countries: selectedCountries,
    });
    setErrors({
        ...errors,
        countries: validateCountries(selectedCountries),
      });
  };

  const handleSelectActivityChange = (event) => {
    const selectedActivities = Array.from(
        event.target.selectedOptions,
        (option) => option.value
    );
    setValues({
        ...values,
        selectedActivity: selectedActivities,
    });
    setErrors({
        ...errors,
        selectedActivity: selectedActivities.length > 0 ? "" : "Seleccione al menos una actividad",
      });
};



const handleSubmit = async (event) => {
    event.preventDefault();

    setErrors({
        continent: validateContinent(values.continent),
        countries: validateCountries(values.countries),
        selectedActivity: values.selectedActivity.length > 0 ? "" : "Seleccione al menos una actividad",
      });
  
      // Verificar si hay errores en los campos
      if (Object.values(errors).some((error) => error !== "")) {
        return;
      }



try {

      // Obtener el nombre de la actividad seleccionada
      const selectedActivity = values.selectedActivity[0];
      // Obtener la información de la actividad actual para obtener su ID
      const activityId= activityNames.find((activity) => activity === selectedActivity);
      console.log(activityId)

      if (!activityId) {
        console.error("No se encontró información para la actividad seleccionada");
        return;
      }

      console.log(activityId)

      // Crear el objeto a enviar en la solicitud PUT
      const agregarPais = {
        activityName: selectedActivity,
        countries: values.countries,
      };

      await axios.put(`http://localhost:3001/activities`, agregarPais);

      // Limpiar el formulario y mostrar un mensaje de éxito
      setValues({
        selectedActivity: [],
        countries: [],
      });

      alert("País agregado a la actividad exitosamente");

      navigate(PATHROUTES.HOME)

    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className={styles.formDiv}>
    <Link to="/form" className={styles.linkDiv}
    style={{ textDecoration: 'none', color: 'inherit' }}>
         <button type="submit">Volver </button> </Link>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Añade un país a la actividad</h1>

        <section>
          <label className={styles.label}>
            Seleccionar Continente:
            <Filters
              className={styles.selectForm}
              onChange={handleContinentChange}
            />
          </label>
        </section> 
        
        <section>
          <label className={styles.label}>
            Seleccionar País:
            <select className={styles.input} name="countries" multiple value={values.countries} onChange={handleSelectCountryChange} >
              {countryNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}

            </select>
            <span className={styles.errorMessage}>{errors.countries}</span>
          </label>
        </section>  <br />

        <label className={styles.label}>
          Actividades Actuales:
        <select className={styles.input} name="selectedActivity" multiple value={values.selectedActivity} onChange={handleSelectActivityChange } >
          {activityNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
        </select>
        <span className={styles.errorMessage}>{errors.selectedActivity}</span>
        </label>

        <section>  <br />
        <button type="submit" className={styles.btn}>
            Agregar país a la actividad
        </button>
        </section>

      </form>
    </div>
  );
};

export default FormAdd;