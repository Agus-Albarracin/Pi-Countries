// Router
import { Link } from 'react-router-dom'
// Helpers
import PATHROUTES from '../../helpers/PathRoutes.helper'
// Styles
import styles from './Error.module.css'
//img
import imgerror from "./errorimg.jpeg"


const Error = () => {
  return (
    <div className={styles.body}>
      <div className={styles.errorDiv}>
       <img src={imgerror} />
        <Link to={PATHROUTES.HOME}>
          <button className={styles.btn}>Llevanos al inicio.</button>
        </Link>
      </div>
    </div>
  )
}

export default Error