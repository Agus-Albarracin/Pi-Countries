// Router
import { useParams, Link } from 'react-router-dom';
// React
import { useState, useEffect } from 'react'
// Helpers
import PATHROUTES from '../../helpers/PathRoutes.helper';
// Axios
import axios from 'axios';
// Styles
import styles from './Detail.module.css'

const Detail = () => {

    const [country, setCountry] = useState({});
    const { id } = useParams();



    useEffect(() => {
        axios(`http://localhost:3001/countries/${id}`)
        .then((res) => {
            setCountry(res.data);
        })

        
        .catch((err) => {
            console.log(err)
            alert('Hubo un error al buscar el país.')
        })
    }, [id]);




    return (
        <div className={styles.body}>

            <div className={styles.rightContainer} >
                <img src={country?.image} alt='' className={styles.image} />
            </div>

            <div>
                <div  className={styles.dataDiv}>
                    <h1 className={styles.titulo}>{country?.name}</h1>
                    <h2>Continente:  {country?.continente}</h2>
                    <h2>Capital:  {country?.capital}</h2>
                    <h2>Subregion:  {country?.subregion}</h2>
                    <h2>Área:  {country?.area}</h2>
                    <h2>Población: {country?.poblacion}</h2>

                </div>

                    <div className={styles.divBtn}>
                     <Link to={PATHROUTES.HOME}>
                     <button className={styles.btn}>Volver</button>
                     </Link>
                    </div>

             </div>
     
        </div>
    )
}

export default Detail