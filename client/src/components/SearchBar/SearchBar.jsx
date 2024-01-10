// // React
// import { useState } from 'react'
// // Redux
// import { useDispatch } from 'react-redux'
// // Actions
// import { resetCountries, searchCountries, setCurrentPage } from '../../redux/actions'
// // Styles
// import styles from './SearchBar.module.css'

// const SearchBar = () => {
//     const [name, setName] = useState('');
//     const dispatch = useDispatch();
//     const handleChange = (e) => {
//         const {value} = e.target;
//         setName(value)
//         if (value.trim() === ''){
//             dispatch(resetCountries());
//             dispatch(setCurrentPage(1));
//         }
//     };
//     const countryName = (name) => {
//         return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
//     }
//     const onSearch = (name) => {
//         const formattedName = countryName(name);
//         if (formattedName === '') alert('Por favor, ingrese un nombre de país.')
//         dispatch(searchCountries(formattedName));
//         dispatch(setCurrentPage(1));
//     };
//     const handleReset = () => {
//         dispatch(resetCountries());
//         dispatch(setCurrentPage(1));
//     };
//     return (
//         <div className={styles.divBar}>
//             <input type='search' onChange={handleChange} className={styles.inputBar} placeholder='Escribe el nombre de un país 🔍'/>
//             <button className={styles.btn} onClick={() => onSearch(name)}>Buscar</button>
//             <button className={styles.btn2} onClick={handleReset}>Reset</button>
//         </div>
//     )
// }

// export default SearchBar;

//** COMPONENTE PARA FILTRAR EN TIEMPO REAL */

// React
import { useState } from 'react'
// Redux
import { useDispatch, useSelector } from 'react-redux'
// Actions
import { resetCountries, searchCountries, setCurrentPage } from '../../redux/actions'
// Styles
import styles from './SearchBar.module.css'

const SearchBar = () => {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.allCountries);

    const handleChange = (e) => {
        const { value } = e.target;
        setName(value);

        // Filtrar los países en base a las letras ingresadas
        const filteredCountries = allCountries.filter((country) =>
            country.name.toLowerCase().includes(value.toLowerCase())
        );

        // Despachar la acción para actualizar los países filtrados
        dispatch(searchCountries(value));
        dispatch(setCurrentPage(1)); // Establecer la página actual en 1 después de la búsqueda
    };

    const handleReset = () => {
        setName(''); // Restablecer el estado del nombre
        dispatch(resetCountries());
        dispatch(setCurrentPage(1));
    };

    return (
        <div className={styles.divBar}>
            <input
                type='search'
                value={name}
                onChange={handleChange}
                className={styles.inputBar}
                placeholder='Escribe el nombre de un país 🔍'
            />
            <button className={styles.btn} onClick={handleReset}>
                Reset
            </button>
        </div>
    );
}

export default SearchBar;
