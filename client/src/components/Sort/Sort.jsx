// Redux
import { useDispatch } from 'react-redux';
// Actions
import {
    sortCountriesByNameAscending,
    sortCountriesByNameDescending,
    sortCountriesByPopulationAscending,
    sortCountriesByPopulationDescending,
    resetCountries
} from '../../redux/actions';
// Styles
import styles from './Sort.module.css'

const Sort = () => {
    const dispatch = useDispatch();
    const actions = {
        'unsorted': resetCountries,
        'name-ascending': sortCountriesByNameAscending,
        'name-descending': sortCountriesByNameDescending,
        'population-ascending': sortCountriesByPopulationAscending,
        'population-descending': sortCountriesByPopulationDescending
    };
    const handleChange = (event) => {
        const selectedAction = actions[event.target.value];
        if (selectedAction){
            dispatch(selectedAction());
        }
    }
    return (
        <select onChange={handleChange} className={styles.select}>
            <option value="unsorted">Ordenar por...</option>
            <option value="name-ascending">Nombre ↑</option>
            <option value="name-descending">Nombre ↓</option>
            <option value="population-ascending">Poblacion ↑</option>
            <option value="population-descending">Poblacion ↓</option>
        </select>
    )
}

export default Sort;