// Types
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
    SORT_COUNTRIES_BY_POPULATION_DESCENDING,

    GET_ACTIVITIES,
} from './actionTypes';


// Axios
import axios from 'axios';



export const getCountries = () => {

    return async (dispatch) => {
        try {
            const {data}= await axios.get("http://localhost:3001/countries");
            // console.log(data)
            dispatch({
                type: GET_COUNTRIES,
                payload: data
            });
        } catch (error) {
            console.error("Error al obtener los países:", error);
        }
    }
}

// export const getCountries = () => {
    
//     return (dispatch) =>{
//             fetch("http://localhost:3001/countries")
//             .then(res => res.json())
//             .then(data => dispatch({type: GET_COUNTRIES, payload: data}))
//             .catch(error => error)

//     }
// }

export const getActivities = () => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get("http://localhost:3001/activities");
        dispatch({
          type: GET_ACTIVITIES,
          payload: data
        });
      } catch (error) {
        console.error("Error al obtener las actividades:", error);
      }
    }
  };

//* SEARCH QUE FUNCIONA.
// export const searchCountries = (name) => {
//     return async (dispatch) => {
//         try {
//             const response = await axios.get(`http://localhost:3001/country?name=${name}`);
//             if (response.data.length === 0){
//                 window.alert(`No se encontró ningún país con el nombre ${name}`)
//             } else {
//                 const dataArray = [response.data];
//                 dispatch({
//                     type: SEARCH_COUNTRIES,
//                     payload: dataArray
//                 })
//             }
//         } catch (error) {
//             console.error(`Error al buscar países bajo el nombre ${name}:`, error);
//         }
//     }
// }

export const searchCountries = (name) => {
    return async (dispatch, getState) => {
        try {
            const allCountries = getState().allCountries;
            const filteredCountries = allCountries.filter((country) =>
                country.name.toLowerCase().includes(name.toLowerCase())
            );
            dispatch({
                type: SEARCH_COUNTRIES,
                payload: filteredCountries,
            });
            dispatch(setCurrentPage(1)); // Establece la página actual en 1 luego de la búsqueda
        } catch (error) {
            console.error(`Error al buscar países bajo el nombre ${name}:`, error);
        }
    };
};


// export const searchCountries = (name) => {
//     return (dispatch) => {
//         fetch(`http://localhost:3001/country?name=${name}`)
//         .then(res =>{
//             if(!res.ok){
//                 throw new Error("No se encontro ningun nombre")
//             } else {
//               return res.json()
//             }
//         })
//         .then(data =>{
//             if(data.length === 0) {
//                 window.alert("No se encontro ningun pais")
//             } else {
//                 const thedata = [data]
//                dispatch({type: SEARCH_COUNTRIES, payload: thedata})
//             }
//         } )
//         .catch(error => error)
//     }
// }

export const deleteActivity = (activityId) => {
    return async (dispatch) => {
      try {
        await axios.delete(`http://localhost:3001/activities/${activityId}`);
        dispatch({
          type: DELETE_ACTIVITY,
          payload: activityId // Envía el ID de la actividad a eliminar
        });
      } catch (error) {
        console.error('Error al eliminar la actividad:', error);
      }
    };
  };



export const setCurrentPage = (page) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: page,
    }
}

export const resetCountries = () => {
    return {
        type: RESET_COUNTRIES,
    }
}

export const resetActivities = () => {
    return {
        type: RESET_ACTIVITIES,
    }
}


export const filterCountriesByContinent = (continent) => {
    return (dispatch, getState) => {
        const allCountries = getState().allCountries;
        const filteredCountries = 
            continent === "all"
            ? allCountries
            : allCountries.filter((country) => country.continente === continent);
        dispatch({
            type: FILTER_COUNTRIES_BY_CONTINENT,
            payload: filteredCountries,
        })
    }
}


export const filterCountriesByActivity = (activity) => {
    return (dispatch, getState) => {
        try {
            const allCountries = getState().allCountries;
            let filteredCountries;
            if (activity === "all"){
                filteredCountries = allCountries;
            } else {
                filteredCountries = allCountries.filter((country) => country.Activities.some((act) => act.name === activity));  

            }
            dispatch ({
                type: FILTER_COUNTRIES_BY_ACTIVITY,
                payload: filteredCountries
            })
        } catch (error) {
            console.error('Error al filtrar países por actividad', error);
        }
    }
}

export const sortCountriesByNameAscending = () => {
    return {
        type: SORT_COUNTRIES_BY_NAME_ASCENDING,
    };
};

export const sortCountriesByNameDescending = () => {
    return {
        type: SORT_COUNTRIES_BY_NAME_DESCENDING,
    };
};

export const sortCountriesByPopulationAscending = () => {
    return {
        type: SORT_COUNTRIES_BY_POPULATION_ASCENDING,
    };
};

export const sortCountriesByPopulationDescending = () => {
    return {
        type: SORT_COUNTRIES_BY_POPULATION_DESCENDING,
    };
};