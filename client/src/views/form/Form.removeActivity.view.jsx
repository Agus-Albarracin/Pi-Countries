import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getActivities } from "../../redux/actions";

import PATHROUTES from "../../helpers/PathRoutes.helper";

import styles from "./Form.module.css";


const FormRemoveActivity = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getActivities())
      }, [dispatch]);
    
  const activityNames = useSelector((state) => state.activities.map((activity) => activity.name))

  const [values, setValues] = useState({
    selectedActivity: [],
  });

  const [errors, setErrors] = useState({
    selectedActivity: "",
  });


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
        selectedActivity: values.selectedActivity.length > 0 ? "" : "Seleccione al menos una actividad",
      });
  
      // Verificar si hay errores en los campos
      if (Object.values(errors).some((error) => error !== "")) {
        return;
      }

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

          // Preguntar al usuario antes de eliminar
    const confirmDelete = window.confirm("¿Estás seguro que deseas eliminar esta actividad?");

    if (!confirmDelete) {
      // Si el usuario elige "Cancelar" en la alerta, no hagas nada
      return;
    }

      const eliminarActivities = {
        activityName: selectedActivity,

      };
      console.log(eliminarActivities)

   
        try{
        //siempre que use un delete, recordar que cuando envie dato por el cuerpo de la solicitud debo usar {data: acavalainfo},
        //esta estructura ya que no siempre al momento de enviar la solicitud, estoy enviando un json para que el back lo resiva.
        await axios.delete(`http://localhost:3001/activities`, { data: eliminarActivities });


        // Limpiar el formulario y mostrar un mensaje de éxito
        setValues({
          selectedActivity: [],
        });
  
        alert("Se elimino la actividad exitosamente");
  
        navigate(PATHROUTES.FORM)

  
      } catch (error) {
        console.error(error);
      }


    
  };



  return (
    <div className={styles.formDiv}>
    <Link to="/form" className={styles.linkDiv}
    style={{ textDecoration: 'none', color: 'inherit' }}>
         <button type="submit" className={styles.btnLink}>Volver </button> </Link>


      <form onSubmit={handleSubmit} className={styles.form}>
       <h1>Elimina la actividad</h1>

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
        <button type="submit" className={styles.btnDelete}>
            Eliminar actividad
        </button>

        </section>

      </form>
    </div>
  );
};

export default FormRemoveActivity;