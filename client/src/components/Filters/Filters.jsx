import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
//activities
import { resetCountries,
     filterCountriesByActivity,
     filterCountriesByContinent,
     resetActivities } from "../../redux/actions";
//sort
import {
        sortCountriesByNameAscending,
        sortCountriesByNameDescending,
        sortCountriesByPopulationAscending,
        sortCountriesByPopulationDescending} from '../../redux/actions';


import axios from "axios";
import styles from './Filter.module.css';

const Filters = ({ selectedActivity, setSelectedActivity }) =>{

    const dispatch = useDispatch();
    const [activities, setActivities] = useState([]);
    const [activity, setActivity] = useState("all");



    useEffect(() => {
      
        const filterActivities = async () => {
            
            try {
                 const response = await axios.get("http://localhost:3001/activities");
                        
                     if (response.status === 200) {
                            const activityNames = response.data.map((activity) => activity.name);
                            setActivities(activityNames);          
                        }
            }
            catch (error) {

               if (error.response && error.response.status === 404) {console.warn("%cGET http://localhost:3001/activities 200 \n(esperando la creación de actividades para su ejecución.)", "color: green;");} 
               else {console.error("Error en la solicitud:", error.message);}

            }
    };
            
                
     filterActivities();
       

    }, []);

    const actions = {
        'unsorted': resetCountries,
        'name-ascending': sortCountriesByNameAscending,
        'name-descending': sortCountriesByNameDescending,
        'population-ascending': sortCountriesByPopulationAscending,
        'population-descending': sortCountriesByPopulationDescending
    };
    const handleSortChange = (event) => {
        const selectedAction = actions[event.target.value];
        if (selectedAction){
            dispatch(selectedAction());
        }

        if(event.target.value === "unsorted"){
            dispatch (resetCountries());
            dispatch(resetActivities());
                //deberia renderizar visualmente el valor.
                // const selectTeam = document.getElementById("selectTeam");
                // selectTeam.value = "All";
            const selectAllActivityFilter = document.getElementById("selectActivityFilter")
            selectAllActivityFilter.value = "all"
            console.log(selectAllActivityFilter.value)

            const selectAllContinentFilter = document.getElementById("selectContinentFilter")
            selectAllContinentFilter.value = "all"      
            

        }
    }
     
    const handleContinentChange = (event) => {
    const allConts =  "all"||"Africa"||"Americas"||"Asia"||"Europe"||"Oceania"||"Antarctic";
        const continent = event.target.value;
        if (continent === "all"   ||
        continent === "Africa"  ||
        continent === "Americas" ||
        continent === "Asia" ||
        continent === "Europe" ||
        continent === "Oceania" ||
        continent === "Antarctic"
        ) {
            dispatch (resetCountries());
            dispatch(resetActivities());
                //deberia renderizar visualmente el valor.
                // const selectTeam = document.getElementById("selectTeam");
                // selectTeam.value = "All";
                const selectAll = document.getElementById("selectActivityFilter")
                selectAll.value = "all"
                console.log(selectAll.value)
            dispatch(filterCountriesByContinent(continent))

        } else {
            dispatch(filterCountriesByContinent(continent));

        }
    }

        
    const handleActivityChange = (event) => {

            const activity = event.target.value; 
            console.log(activity)
            setSelectedActivity(activity);

            if (activity === "allfilter" || activity !== "allfilter") { 
                dispatch(resetCountries());

            const selectAllContinentFilter = document.getElementById("selectContinentFilter")
                selectAllContinentFilter.value = "all"

            const selectUnsorted = document.getElementById("selectSortFilter")
                selectUnsorted.value = "unsorted"
                dispatch(filterCountriesByActivity(activity));
            }
            else { dispatch(filterCountriesByActivity(activity));}

   };


return (
<div name="BoxAllFilters" className={styles.BoxAllFilters}>
    
        <div name="BoxFilterSort" className={styles.BoxFilterSort}>
        <select onChange={handleSortChange} id="selectSortFilter" className={styles.select}>
            <option value="unsorted">Ordenar por...</option>
            <option value="name-ascending">Nombre ↑</option>
            <option value="name-descending">Nombre ↓</option>
            <option value="population-ascending">Poblacion ↑</option>
            <option value="population-descending">Poblacion ↓</option>
        </select>
        </div>
        <div name="BoxFilterContinent" className={styles.BoxFilterContinent}>
            <select onChange={handleContinentChange} id="selectContinentFilter" className={styles.select}>
                <option value="all">Seleccione los continentes</option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europa</option>
                <option value="Oceania">Oceania</option>
                <option value="Antarctic">Antartida</option>
            </select>
        </div>
        <div name="BoxActivityFilter" className={styles.BoxFilterActivity}>

                <select onChange={handleActivityChange} id="selectActivityFilter" className={styles.select}>
                    <option value="all">Seleccione actividad</option>
                    {activities.map(activity => (
                        <option key={activity} value={activity}>{activity}</option>
                        ))}
                </select>
        </div>
</div>
        );
    };

    export default Filters;
