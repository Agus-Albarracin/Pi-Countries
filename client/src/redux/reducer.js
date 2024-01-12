// Actions
import {
    GET_COUNTRIES,
    SEARCH_COUNTRIES,
    SET_CURRENT_PAGE,
    RESET_COUNTRIES,
    RESET_ACTIVITIES,
    FILTER_COUNTRIES_BY_CONTINENT,
    FILTER_COUNTRIES_BY_ACTIVITY,
    DELETE_ACTIVITY,
    SORT_COUNTRIES_BY_NAME_ASCENDING,
    SORT_COUNTRIES_BY_NAME_DESCENDING,
    SORT_COUNTRIES_BY_POPULATION_ASCENDING,
    SORT_COUNTRIES_BY_POPULATION_DESCENDING
} from './actionTypes';


const initialState= {
    countries: [],
    allCountries: [],
    currentPage: 1,
};


const rootReducer = ( state = initialState, {type, payload}) => {
    switch (type) {
            
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries: payload,
                countries: payload
            }
            //* SEARCH QUE FUNCIONA
        // case SEARCH_COUNTRIES:
        //     return {
        //         ...state,
        //         countries: payload
        //     }
            case SEARCH_COUNTRIES:
    return {
        ...state,
        countries: payload,
    };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: payload
            }
        case RESET_COUNTRIES:
            return {
                ...state,
                countries: state.allCountries
            }


        case RESET_ACTIVITIES:
                return {
                    ...state,
                    activities: state.allActivities
                }

        case DELETE_ACTIVITY:
                    // Filtra las actividades para eliminar la actividad con el ID enviado en payload
             const updatedActivities = state.allActivities.filter(activity => activity.id !== payload);
              
             return {
                 ...state,
                 allActivities: updatedActivities,
                 activities: updatedActivities // Actualiza la lista de actividades en el estado global
                    };





        case FILTER_COUNTRIES_BY_CONTINENT:
            return {
                ...state,
                countries: payload
            }
        case FILTER_COUNTRIES_BY_ACTIVITY:
            return{
                ...state,
                countries: payload
            }
        case SORT_COUNTRIES_BY_NAME_ASCENDING:
            return {
                ...state,
                countries: [...state.countries].sort((a,b) => a.name.localeCompare(b.name))
            }
        case SORT_COUNTRIES_BY_NAME_DESCENDING:
            return {
                ...state,
                countries: [...state.countries].sort((a,b) => b.name.localeCompare(a.name))
            }
        case SORT_COUNTRIES_BY_POPULATION_ASCENDING:
            return {
                ...state,
                countries: [...state.countries].sort((a,b) => b.poblacion - a.poblacion)
            }
        case SORT_COUNTRIES_BY_POPULATION_DESCENDING:
            return {
                ...state,
                countries: [...state.countries].sort((a,b) => a.poblacion - b.poblacion)
            }
        default:
            return {...state}
    }
}

export default rootReducer;