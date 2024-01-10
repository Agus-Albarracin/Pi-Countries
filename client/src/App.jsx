import {Routes, Route} from 'react-router-dom';

import './App.css';
import Home from './views/home/home';
import Detail from './views/detail/detail';
import LandingPage from './views/landing/landing';
import Form from './views/form/form';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/' 
// axios.defaults.baseURL = 'https://pi-countries-henry-production.up.railway.app/'



function App() {
  /* const [input, setInput] = useState(""); */
  /* const [countries, setCountries] = useState([]) */

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App; 