// Router
import { Link } from 'react-router-dom';
// Styles
import styles from './Card.module.css'

const Card = ({ id, name, image, continente }) => {
    return (
        <div className={styles.card}>
        <Link to={`/detail/${id}`} className={styles.linkStyle}>
          <div className={styles.imageContainer}>
            <img src={image} alt="" className={styles.image} />
          </div>
          <div className={styles.details}>
            <div className={styles.nameId}>
              <h2 className={styles.title}>{name}</h2>
              <h2 className={styles.id}>{id}</h2>
            </div>
            <h2 className={styles.continente}>Continente: {continente}</h2>
          </div>
        </Link>
      </div>
    )
}

export default Card;