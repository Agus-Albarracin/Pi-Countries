// Routing
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// Components
import SearchBar from '../SearchBar/SearchBar';
// Helpers
import PATHROUTES from '../../helpers/PathRoutes.helper';
// Styles
import styles from './NavBar.module.css'


const NavBar = () => {

const navigate = useNavigate();


  const handleLogout = () => {
    // Limpiar la sesión u otros pasos de cierre de sesión aquí

    // Navegar a la página de inicio
    navigate(PATHROUTES.LANDING, { replace: true });
  };


    return (
        <div className={styles.navMain}>
          <button onClick={handleLogout} className={styles.logout} style={{ backgroundColor: 'transparent', border: "none" }}>
            <h4>Cerrar Sesión</h4>
          </button>
            <div className={styles.links}>
                {/* <Link to={PATHROUTES.LANDING} className={styles.title}>
                    <h1>Cerrar Sesión</h1>
                </Link> */}

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