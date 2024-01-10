import { GET_COUNTRIES, GET_COUNTRY, GET_COUNTRIES_BY_NAME, FILTER_BY_CONTINENT,
    ORDER_BY_NAME, POST_ACTIVITY, GET_ACTIVITIES, ORDER_BY_POPULATION, FILTER_BY_ACTIVITY} from "./actions-types";

const initialState = {
countries: [],
allCountries:[],
country: [],
activities: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
            }

        case GET_COUNTRY:
            return { ...state, country: action.payload }

        case GET_COUNTRIES_BY_NAME:
            return {
                ...state,
                countries: action.payload
            }


        case GET_ACTIVITIES:
            return { ...state, activities: action.payload }

        case POST_ACTIVITY:
            return { ...state }

        case FILTER_BY_CONTINENT:
            const allCountries = state.allCountries;
            const filterContinent = action.payload === 'All' ? allCountries : allCountries.filter(element => element.continent === action.payload)

            return {
                ...state,
                countries: filterContinent
            }


        case ORDER_BY_NAME:

            const OrderCountries = [...state.allCountries];
            const OrderCountriesall = action.payload === 'asc' ?
                OrderCountries.sort((a, b) => a.name.localeCompare(b.name))
                :
                OrderCountries.sort((a, b) => b.name.localeCompare(a.name));

            return {
                ...state,
                countries: OrderCountriesall
            }

        case ORDER_BY_POPULATION:
            const OrderPopulation = [...state.allCountries];

            const OrderPopulationall = action.payload === 'Mayor' ?
                OrderPopulation.sort((a, b) => b.population - a.population)
                :
                OrderPopulation.sort((a, b) => a.population - b.population);

            console.log(OrderPopulationall)

            return {
                ...state,
                countries: OrderPopulationall
            }


        case FILTER_BY_ACTIVITY:
            const FilterByActivity = [...state.allCountries];
            const activityName = action.payload;
            console.log(activityName)
            console.log(state.activities)
            const filteredActivities = state.activities
            .filter(activity => activity.name === activityName)
            .flatMap(activity => activity.Countries)
            .map(country => country.name);

            const filteredCountries = FilterByActivity.filter(obj => filteredActivities.includes(obj.name))
            console.log(filteredCountries)
            return {
                ...state,
                countries: filteredCountries,
            }

        default:
            return { ...state };
    }
}



export default rootReducer;