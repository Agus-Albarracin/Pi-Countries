import { useDispatch, useSelector } from "react-redux";
import { filterByContinent, orderByName, orderByPopulation, filterByActivity } from '../../redux/actions.js';
import './Filters.css'

export default function FiltersNav(){

    const activities = useSelector(state=> state.activities)

    const dispatch = useDispatch();

    function handleOrderAct(e){
        dispatch(filterByActivity(e.target.value));
    }
    
    function handleOrderName(e){
        dispatch(orderByName(e.target.value));
    }
    
    function handleOrderPopulation(e){
        dispatch(orderByPopulation(e.target.value));
    }
    
    function handleFilter(e){
        dispatch(filterByContinent(e.target.value));
    }

    return(
    <div className="filters-container">
        <select className='filter-activities' onChange={handleOrderAct}>
                    <option>Activities</option>
                    {activities?.map((act) => (
                        <option value={act.name}>
                            {act.name}
                        </option>
                    ))}
                </select>
            <select className='order-name' onChange={handleOrderName}>
                <option>Order</option>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
            </select>

            <select className='order-population'  onChange={handleOrderPopulation}>
                <option>Population</option>
                <option value="Mayor">Higher population</option>
                <option value="Menor">Lower population</option>
            </select>

            <select className='filter-region' onChange={handleFilter}>
        <option value="">Filter by Region</option>
        <option value="All">Todos</option>
        <option value="Africa">África</option>
        <option value="Americas">América</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europa</option>
        <option value="Oceania">Oceanía</option>
            </select>
            </div>
    )
}