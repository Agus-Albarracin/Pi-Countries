import Nav from "../../components/Nav/nav";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCountry } from "../../redux/actions"
import './detail.css'
import Footer from "../../components/Footer/Footer";

function Detail(){
    const {id} = useParams();

    const dispatch = useDispatch();
    const country = useSelector(state => state.country);
    console.log(country);
    const {countryId, name, flag, continent, capital, area, population, subregion, Activities} = country;

    useEffect(() => {
        dispatch(getCountry(id));
    }, [dispatch, id])


    return(
    <div>
      <Nav className='navcontainer'/>
        <div className='detail-container'>
          <div className='detail-container-1'>
            <h2 className='detail-name'>{name}</h2>
          </div>
          <div className='detail-container-2'>
            <img className='detail-img' src={flag} alt='img-flag' />
            <ul className='detail-text'>
              <li>ID: {countryId}</li>
              <li>Continente: {continent}</li>
              <li>Capital: {capital}</li>
              <li>Subregión: {subregion}</li>
              <li>Área: {area}</li>
              <li>Población: {population}</li>
            </ul>
          </div>
          <h2 className='activities-name'>Activities</h2>
          <hr/>
        <strong>{Activities?.map((act)=>(
          <ul className="activities">
        <li className="activities-data">Name: <span>{act.name}</span></li>
        <li className="activities-data">Difficulty: <span>{act.difficulty}</span></li>
        <li className="activities-data">Duration: <span>{act.duration}</span></li>
        <li className="activities-data">Season: <span>{act.season}</span></li>       
          </ul>
        ))}</strong>
        </div>
        <Footer/>
    </div>
    );
}

export default Detail;