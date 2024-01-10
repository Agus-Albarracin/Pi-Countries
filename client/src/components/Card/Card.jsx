import './Card.css'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

function Card(props) {
    const navigate = useNavigate();

    function navigateHandler() {
        navigate(`/detail/${props.id}`)
     }

   return (
    <div key={props.key} country={props.country} className='card-container' onClick={navigateHandler}>
        <img className='img' src={props.image} alt='img-flag' width="300px" height="125px" />
        <div className='text-container'>
            <h1 className='card-title'>{props.name}</h1>
            <p className='card-continent'>{props.continent}</p>
        </div>
</div>
)
}

const mapStateToProps = (state) =>{
    return {
        countries: state.countries,
    };
 }
 
 export default connect(mapStateToProps)(Card);