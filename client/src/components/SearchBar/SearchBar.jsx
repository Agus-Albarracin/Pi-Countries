import './SearchBar.css';
import lupa from '../../img/lupa.svg';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { getCountriesByName } from '../../redux/actions.js';

export default function SearchBar() {
   const [input, setInput] = useState("");

   const dispatch = useDispatch();

   function changeHandler(e) {
      e.preventDefault();
      let inputValue = e.target.value;
      setInput(inputValue);
    }

   function handleSearch(){
      dispatch(getCountriesByName(input));
      setInput("");
  }

   return (
      <div className="DivSearch">
         <div className='Search-bar'>
         <input className="Input" placeholder="Search..." type='search' value={input} onChange={changeHandler}/>
      <button className="Button"  type="button">
         <img src={lupa} className="lupa" alt="lupa" onClick={handleSearch}/>
         </button>
         </div>
      </div>
   );
}