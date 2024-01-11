// Redux
import { useDispatch } from "react-redux";
// Actions
import { resetCountries, filterCountriesByContinent, resetActivities} from '../../redux/actions';
// Styles
import styles from './Filter.module.css'

const Filter = () => {
    const dispatch = useDispatch();
    const handleChange = (event) => {
        const continent = event.target.value;
        if (continent === "all") {
            dispatch (resetCountries());
            dispatch(resetActivities());
        } else {
            dispatch(filterCountriesByContinent(continent));

        }
    };
    return (
        <div>
            <select onChange={handleChange} className={styles.select}>
                <option value="all">Seleccione los continentes</option>
                <option value="all">Todos los continentes</option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europa</option>
                <option value="Oceania">Oceania</option>
                <option value="Antarctic">Antartida</option>
            </select>
        </div>
    )
}

export default Filter;