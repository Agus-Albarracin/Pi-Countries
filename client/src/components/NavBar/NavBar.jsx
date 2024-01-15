// Routing
import { Link, Route, Routes, useLocation } from 'react-router-dom';
// Components
import SearchBar from '../SearchBar/SearchBar';
// Helpers
import PATHROUTES from '../../helpers/PathRoutes.helper';
// Styles
import styles from './NavBar.module.css'


const NavBar = () => {
    return (
        <div className={styles.navMain}>
            <div className={styles.links}>
                <Link to={PATHROUTES.LANDING} className={styles.title}>
                    <h1>Countries APP</h1>
                </Link>
                <Link to={PATHROUTES.HOME} className={styles.title}>
                    <h1>Home</h1>
                </Link>
                <Link to={PATHROUTES.FORM} className={styles.title}>
                    <h1>Actividades</h1>
                </Link>
            </div>
            <div className={styles.searchBar}>
            <Routes>
                <Route path={PATHROUTES.HOME} element={<SearchBar />} />
                {/* Agrega aquí más Route para otras rutas */}
            </Routes>
            </div>
        </div>
    );
};

export default NavBar;