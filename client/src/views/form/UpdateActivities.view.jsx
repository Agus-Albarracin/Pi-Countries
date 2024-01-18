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

// Components
import Filters from "../../components/Filters/Filter";

// Actions 
import { getCountries, resetCountries, getActivities} from "../../redux/actions"

// Styles
import styles from './Form.module.css';

const UpdateActivities = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const activityNames = useSelector((state) => state.activities.map((activity) => activity.name));
    const activityData = useSelector((state) => state.activities);

    const [values, setValues] = useState({
        selectedActivity: [],
        name: "",
        dificultad: "",
        duracion: "",
        temporada: "",
        countries: [],
      });
    
      useEffect(() => {
        if (activityData) {
          setValues({
            selectedActivity: [],
            name: activityData.name,
            dificultad: activityData.dificultad,
            duracion: activityData.duracion,
            temporada: activityData.temporada,
            countries: activityData.countries ,
          });
          console.log(activityData);
        }
      }, [activityData]);
    
      useEffect(() => {
        dispatch(getCountries());
        dispatch(resetCountries());
        dispatch(getActivities());
      }, [dispatch]);
  
    
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
    
      const handleSubmit = async (event) => {
        event.preventDefault();
      
        // Copia el estado actual de la actividad
        const updatedActivity = { ...activityData };

      
        // Actualiza el campo modificado
        Object.entries(values).forEach(([key, value]) => {
          if (value !== activityData[key]) {
            updatedActivity[key] = value;
          }
        });
        console.log(updatedActivity)
        try {
          // Cambia el método a put o patch y ajusta la URL según la lógica de tu servidor
          await axios.put("http://localhost:3001/updateactivities", updatedActivity);
          const successfulMessage = `Se ha modificado la actividad turística: ${updatedActivity.name || activityData.name}`;
          console.log(updatedActivity);
          alert(successfulMessage);
          setValues({
            selectedActivity: [],
            name: "",
            dificultad: "",
            duracion: "",
            temporada: "",
            countries: [],
          });
          navigate(PATHROUTES.HOME);
        } catch (error) {
          if (error.response && error.response.data) {
            alert(`Error: ${error.response.data.message}`);
            // Maneja el error según tus necesidades
          } else {
            console.error(error);
          }
        }
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
    };

    return (
      <div className={styles.formDiv}>
        <div className={styles.contLink}>
          <Link to="/form" className={styles.linkDiv} style={{ textDecoration: 'none', color: 'inherit' }}>
            <button type="button" className={styles.btnLink} onClick={() => navigate(PATHROUTES.HOME)}>Volver</button>
          </Link>
        </div>
  
        <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Modificar la actividad</h1>
        <label className={styles.label}>
          Actividades Actuales:
          <select
            className={styles.input}
            name="selectedActivity"
            multiple
            value={values.selectedActivity}
            onChange={handleSelectActivityChange}
          >
            {activityNames.map((name) => (
              <option key={name} value={name}>
                {name ? name : "Nombre no definido"}
              </option>
            ))}
          </select>
        </label>

          <label className={styles.label}>
            Nuevo nombre:
            <input
              className={styles.input}
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Ingresa el nuevo nombre de la actividad"
            />
          </label>
          <label className={styles.label}>
            Dificultad:
            <input
              className={styles.input}
              type="number"
              min="1"
              max="5"
              name="dificultad"
              value={values.dificultad}
              onChange={handleChange}
              placeholder="Ingresa la dificultad"
            />
          </label>
          <label className={styles.label}>
            Duracion (hs):
            <input
              className={styles.input}
              type="number"
              min="0"
              name="duracion"
              value={values.duracion}
              onChange={handleChange}
              placeholder="Ingresa la duración"
            />
          </label>
          Temporada:
          <select
            className={styles.select}
            name="temporada"
            value={values.temporada}
            onChange={handleChange}
          >
            <option value="">Selecciona una temporada</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
  
          <button type="submit" className={styles.btn}>Modificar actividad turística</button>
        </form>
      </div>
    );
  }
  
  export default UpdateActivities;