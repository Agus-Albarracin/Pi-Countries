import Card from '../Card/Card';
import './Cards.css';

export default function Cards(props) {   
   const { countries } = props;

   return (
   <div className='Cards-container'>
      {countries.map((element) => (
         <Card
         key={element.countryId}
         id={element.countryId}
         image={element.flag}
         name={element.name}
         continent={element.continent}
         />))}
   </div>
   )
}