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
    FILTER_EXTRA_ACTIVITYFORCONTINENT
} from './actionTypes';


// Axios
import axios from 'axios';



export const getCountries = () => {

    return async (dispatch) => {
        try {
            const {data}= await axios.get("http://localhost:3001/countries");
            // console.log(data)
            dispatch({type: GET_COUNTRIES,payload: data});
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
        dispatch({ type: GET_ACTIVITIES, payload: data });

      } catch (error) {
        console.error("Error al obtener las actividades:", error);
      }
    }
  };

//   export const getActivities= () => {
//     return async(dispatch) => {
//         try{
//             fetch("http://localhost:3001/activities")
//             .then(res => res.json())
//             .then(data => dispatch({type: GET_ACTIVITIES, payload: data}))
//         }catch(error){
//             console.error("Error")
//         }
//     }
//   }


export const deleteActivity = (activityId) => {
    return async (dispatch) => {
      try {
        await axios.delete(`http://localhost:3001/activities/${activityId}`);
        dispatch({type: DELETE_ACTIVITY, payload: activityId });
        
      } catch (error) {
        console.error('Error al eliminar la actividad:', error);
      }
    };
  };

// export const deleteActivity = (activityId) => {
//     return async (dispatch) => {
    //         fetch(`http://localhost:3001/activities/${activityId}`)
    //         .then(res => res.json())
    //         .then(data => dispatch({type: DELETE_ACTIVITY, payload: data}))
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
            } catch (error) {
                console.error(`Error al buscar países bajo el nombre ${name}:`, error);
            }
        };
    };



//Seteo antes el estado, lo modifico y lo retorno. para cuando llega al reducer ya lo tengo modificado.

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


//Este filtro lo hice para filtrar por continentes en las actividades.
export const filterExtra = (continent, activity) => {
    return (dispatch, getState) => {
      const allCountries = getState().allCountries;
  
      
      const filteredCountries = allCountries.filter(country =>
        country.continente.toLowerCase() === continent.toLowerCase() &&
        country.Activities.some(act =>
          act.name.toLowerCase() === activity.toLowerCase()
        )
      );
  
      dispatch({
        type: FILTER_EXTRA_ACTIVITYFORCONTINENT,
        payload: filteredCountries,
      });

    };
  };

export const filterCountriesByActivity = (activity) => {
    return (dispatch, getState) => {
        try {
            const allCountries = getState().allCountries;


            let filteredCountries;
            if (activity === "all"){
                filteredCountries = allCountries;
            } else {
                filteredCountries = allCountries.filter((country) => country.Activities.some((act) => act.name === activity));
                //filtro los paises que dentro del array de activities, cumplan con la actividad que le paso x parametro.  
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

//* SORT

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

//*PAGINATION

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
