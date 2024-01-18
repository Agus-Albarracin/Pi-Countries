// Router
import { useParams, Link, } from 'react-router-dom';
// React
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
// Helpers
import PATHROUTES from '../../helpers/PathRoutes.helper';
//actions
import { getActivities, getCountries } from "../../redux/actions";
// Axios
import axios from 'axios';
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
  
          // Filtrar los países relacionados con la actividad actual
          const relatedCountries = countries.filter((country) =>
            country.Activities.some((act) => act.name === activityName)
          );
  
          return (
            <div key={activity.id || index} className={styles.divForActivities}>
              <h1>{activityName}</h1>
              <p>Temporada: {activity.temporada}</p>
              <p>Duración: {activity.duracion}</p>
              <p>Dificultad: {activity.dificultad}</p>
  
              <div className={styles.countriesContainer}>
                {relatedCountries.map((country, countryIndex) => (
                  <div key={country.id || countryIndex}>
                    <img className={styles.img} src={country.image} alt={`Flag of ${country.name}`} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

      </div>
    
    );
  };
  
  export default ActivitiesViews;