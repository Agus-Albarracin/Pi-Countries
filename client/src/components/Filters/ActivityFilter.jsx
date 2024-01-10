import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { resetCountries, filterCountriesByActivity } from "../../redux/actions";
import axios from "axios";
import styles from './Filter.module.css';

const ActivityFilter = ({ selectedActivity, setSelectedActivity }) => {
        const dispatch = useDispatch();
        const [activities, setActivities] = useState([]);
        const [activity, setActivity] = useState("all");

        const [loadingError, setLoadingError] = useState(false);

        useEffect(() => {
            let isMounted = true;
            const filterActivities = async () => {
                try {
                    const response = await axios.get("http://localhost:3001/activities");
                    if (isMounted && response.status === 200) {
                        const activityNames = response.data.map((activity) => activity.name);
                        setActivities(activityNames);
                    }
                } catch (error) {
                    if (isMounted && error.response && error.response.status === 404) {
                        setLoadingError(true);
                        console.warn("%c GET La ruta existe y funciona correctamente: http://localhost:3001/activities \n200 (esperando la creación de actividades para su ejecución.)", "color: green;");
                    } else if (isMounted) {
                        console.error("Error en la solicitud:", error.message);
                    }
                }
            };

            if (!loadingError) {
                filterActivities();
            }
            return () => {
                isMounted = false;
            };
        }, [loadingError]);

        const handleActivityChange = (event) => {
            const activity = event.target.value; 
            setSelectedActivity(activity);
            if (activity === "all") {
                dispatch(resetCountries());
            } else {
                dispatch(filterCountriesByActivity(activity));
            }
        };

        return (
            <div>
                <select onChange={handleActivityChange} className={styles.select} value={selectedActivity}>
                    <option value="all">Seleccione actividad</option>
                    {activities.map(activity => (
                        <option key={activity} value={activity}>{activity}</option>
                    ))}
                </select>
            </div>
        );
    };

    export default ActivityFilter;

