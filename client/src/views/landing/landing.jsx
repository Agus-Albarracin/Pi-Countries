import './landing.css'
import {useNavigate} from 'react-router-dom';
import videoLanding from '../../img/AroundTheWorld.mp4';
import logo from '../../img/logo.png';

function LandingPage(){
    const navigate = useNavigate();

    const homeHandler = (e) => {
        e.preventDefault();
        navigate('/home');
      };

    return (
        <div className='landing-container'>
            <div className='landing-text-container'>
                <img src={logo} className='landing-title' alt='img-logo'/>
                <button className='landing-button' onClick={homeHandler}>Home</button>
            </div>
            <video autoPlay muted preload loop>
                <source src={videoLanding} type='video/mp4'></source>
            </video>
            <div className="travel-video"></div>
        </div>
    );
}

export default LandingPage;