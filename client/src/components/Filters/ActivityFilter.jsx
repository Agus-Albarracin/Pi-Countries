// Redux
import { useDispatch } from "react-redux";
// React
import { useEffect, useState } from "react";
// Actions
import { resetCountries, filterCountriesByActivity } from "../../redux/actions";
// Axios
import axios from "axios";
// Styles
import styles from './Filter.module.css'

const ActivityFilter = () => {
    const dispatch = useDispatch();
    const [activities, setActivities] = useState([]);
    useEffect(() => {
        const filterActivities = async() => {
            const response = await axios.get("http://localhost:3001/activities");
            const activityNames = response.data.map((activity) => activity.name);
            setActivities(activityNames);
        };
        filterActivities();
    }, []);
    const handleActivityChange = (event) => {
        const activity = event.target.value;
        if (activity === "all") {
            dispatch (resetCountries());
        } else {
            dispatch(filterCountriesByActivity(activity));
        }
    };
    return (
        <div>
            <select onChange={handleActivityChange} className={styles.select}>
                <option value="all">Todas las actividades</option>
                {activities.map(activity => (
                    <option key={activity} value={activity}>{activity}</option>
                ))}
            </select>
        </div>
    )
}

export default ActivityFilter;