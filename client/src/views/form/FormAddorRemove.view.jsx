import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCountries, resetCountries, getActivities } from "../../redux/actions";

import Filters from "../../components/Filters/Filter";
import PATHROUTES from "../../helpers/PathRoutes.helper";

import {validateCountries, validateContinent } from "./validations";
import styles from "./Form.module.css";


const FormAddorRemove = () => {
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

    const buttonAction = document.activeElement;
    console.log(buttonAction)
    const action = buttonAction.getAttribute('action');

    //*ERRORS
      setErrors({
        continent: validateContinent(values.continent),
        countries: validateCountries(values.countries),
        selectedActivity: values.selectedActivity.length > 0 ? "" : "Seleccione al menos una actividad",
      });
      if (Object.values(errors).some((error) => error !== "")) { return;}


     //*INFO DE ACTIVITY
      const selectedActivity = values.selectedActivity[0];
      const activityId= activityNames.find((activity) => activity === selectedActivity);
      console.log(activityId)
      if (!activityId) {
        console.error("No se encontró información para la actividad seleccionada");
        return;
      }
      console.log(activityId)

      //*OBJETO REQUEST
      // Creo el objeto para poder enviar la solicitud put.
      const addOrRemovePais = {
        activityName: selectedActivity,
        countries: values.countries,
        action: action,
      };
      console.log(addOrRemovePais)


    //* ADD
      if(addOrRemovePais.action === "add"){

        const confirmAdd = window.confirm("¿Estás seguro que deseas agregar el/los países?");

        if (!confirmAdd) { return; }

        try{

        await axios.put(`http://localhost:3001/activities`, addOrRemovePais);
        
        setValues({
          selectedActivity: [],
          countries: [],
        });
  
        alert("País agregado a la actividad exitosamente");
  
        navigate(PATHROUTES.ACTIVITIES)
  
      } catch (error) {
        if(error.response){
          const {status} = error.response;
          if(status === 404){
            console.log("ya existe")
            alert("El país ya existe en la actividad")
            window.location.reload();
          } 
        } else {

          console.error(error);
        }
      }


  //*REMOVE

    } else if (addOrRemovePais.action === "remove"){

        const confirmDelete = window.confirm("¿Estás seguro que deseas eliminar el/los países?");
      
        if (!confirmDelete) {
        
        return;
        }
    

        try{
 
  
       await axios.put(`http://localhost:3001/activities`, addOrRemovePais);
            


        
        setValues({
          selectedActivity: [],
          countries: [],
        });
  
        alert("País eliminado de la actividad exitosamente");
  
        navigate(PATHROUTES.ACTIVITIES)
  
        } catch (error) {
          if(error.response){
            const {status } = error.response;
            if(status === 404){
              console.log("No existe en la actividad")
              alert("El país NO existe en la actividad, por lo tanto no se puede eliminar")
              window.location.reload();
            } } else {

              
              console.error(error);
            }
        
        }

    }
 };



  return (
    <div className={styles.formDiv}>
    <Link to="/form" className={styles.linkDiv}
    style={{ textDecoration: 'none', color: 'inherit' }}>
         <button type="submit" className={styles.btnLink}>Volver </button> </Link>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Añade o Elimina <br /> un país a la actividad</h1>

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
        <button type="submit" action="add" className={styles.btnAdd}>
            Agregar país a la actividad
        </button>
        <button type="submit" action="remove" className={styles.btnDelete}>
            Eliminar país de la actividad
        </button>
        </section>

      </form>
    </div>
  );
};

export default FormAddorRemove;