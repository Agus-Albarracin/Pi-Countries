// Router
import { Link } from 'react-router-dom';
// React
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
//actions
import { getActivities, getCountries } from "../../redux/actions";
//styles 
import styles from './Activities.module.css';

const ActivitiesViews = () => {
    const dispatch = useDispatch();
  
    const activities = useSelector((state) => state.activities);
    const countries = useSelector((state) => state.countries);
  
    useEffect(() => {
      dispatch(getActivities());
      dispatch(getCountries());
    }, [dispatch]);
  
    return (
      <div className={styles.allCont}>
        {activities.map((activity, index) => {
          const activityName = activity.name;
  
          //*Filtro de paises con actividad.
          const relatedCountries = countries.filter((country) =>
            country.Activities.some((act) => act.name === activityName)
          );
  
          return (
            <div key={activity.id || index} className={styles.divForActivities}>
              <h1>{activityName}</h1>
              <p>Temporada: {activity.temporada}</p>
              <p>Duración: {activity.duracion} hs</p>
              <p>Dificultad: {activity.dificultad} de 5</p>
              <p>Países:</p>

              <div className={styles.countriesContainer}>               
                {relatedCountries.map((country, countryIndex) => (
                  <div key={country.id || countryIndex}>
                    <img className={styles.img} src={country.image} alt={`Bandera de ${country.name}`} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

    <Link to="/form" className={styles.linkDiv}
    style={{ textDecoration: 'none', color: 'inherit' }}>
    <button type="submit" className={styles.btnLink}>Volver </button> </Link>
      </div>
    
    );
  };
  
  export default ActivitiesViews;