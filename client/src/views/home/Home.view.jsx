// React
import { useEffect, useState} from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { getCountries, setCurrentPage, filterCountriesByContinent } from '../../redux/actions';
// Components
import Cards from '../../components/Cards/Cards';
import Filters from '../../components/Filters/Filters';
// Styles
import styles from './Home.module.css';

const Home = () => {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    const [selectedActivity, setSelectedActivity] = useState("all"); // Estado para la actividad seleccionada

    //funciones de paginados.
    const currentPage = useSelector((state) => state.currentPage);
    const cardsPorPagina = 8;
    const indexUltimaCarta = currentPage*cardsPorPagina;
    const indexPrimerCarta = indexUltimaCarta - cardsPorPagina;
    const currentCards = countries.slice(indexPrimerCarta, indexUltimaCarta);
    const totalPaginas = Math.ceil(countries.length / cardsPorPagina);

   
    //funciones de los botones de paginado.
    const primerPagina = () => dispatch(setCurrentPage(1));
    const siguientePagina = () => dispatch(setCurrentPage(currentPage+1));
    const anteriorPagina = () => dispatch(setCurrentPage(currentPage-1));
    const ultimaPagina = () => {
        const totalPaginas = Math.ceil(countries.length / cardsPorPagina);
        dispatch(setCurrentPage(totalPaginas));
    };
   
    useEffect (() => {
        dispatch(getCountries());
    }, [dispatch]);



    
    return(
        <div>
            <div className={styles.sortDiv}>
                
                <Filters selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} />

            </div>
            <div>
                <Cards currentCards={currentCards} />
            </div>
            <div className={styles.paginado}>
                <button onClick={primerPagina} disabled={currentPage===1} className={styles.btn}>Primer página</button>
                <button onClick={anteriorPagina} disabled={currentPage===1} className={styles.btn}>Página Anterior</button>
                <span className={styles.btnSpan}>Página {currentPage} de {totalPaginas}</span>
                <button onClick={siguientePagina} disabled={indexUltimaCarta >= countries.length} className={styles.btn}>Página siguiente</button>
                <button onClick={ultimaPagina}  disabled={currentPage === Math.ceil(countries.length / cardsPorPagina)} className={styles.btn}>Última página</button>
            </div>
        </div>
    )
}

export default Home


