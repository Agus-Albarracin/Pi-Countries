// export const getCountries = () => {
//     return (dispatch) => {
//         fetch("")
//         .then(res => res.json())
//         .then(data => dispatch({type: , payload: data}))
//         .catch(error => error)
//     }
// }

// //el primer paso es exportar la constante funcion y retornar una funcicon con el parametro dispatch anteriormente declarado. despues utilzamos el fetch le pasamos la url, luego con el .then manejamos las respuestas y la convertimos en un json(), luego con otro then a lo que nos llega por data, que es por defecto en un objeto le pasamos el type y el payload que va a ser nuestro data y por ultimo manejamos los errores.

// export const getCountry = () =>{
//     return (dispatch) => {
//         fetch("")
//         .then(res => res.json())
//         .then(data => {type:  ,payload: data})
//         .catch(error => error)
//     }
// }

// //vamos a exportar la constante funcion y vamos a retornar una funcion con el metodo dispatch que haga una patecion usando fetch, le pasamos la url, y con el .then manejamos la respuesta y la convertimos en un json(), luego con otro .then para manejar lo que nos llegue por data mediate el dispatch que nos pasan por parametro le pasamos por parametro un objeto con el type y el payload que va a hacer nuestro dat, por ultimos con el .catch manejamos el error

// export const getCountryy = () => {
//     return(dispatch) =>{
//         fetch("")
//         .then(res => res.json())
//         .then(data => dispatch({type:"", payload: data}))
//         .catch(error => error)
//     }
// }


// export const searchCountries = (name) => {
//     return (dispatch) => {
//         fetch("")
//         .then(res =>{
//             if(!res.ok){
//                 throw new Error("No se encontro ningun nombre")
//             } else {
//               return res.json()
//             }
//         })
//         .then(data =>{
//             if(data.length === 0) {
//                 throw new Error("No se encontro ningun pais")
//             } else {
//                return data => dispatch({type: "", payload: data})
//             }
//         } )
//         .catch(error => error)
//     }
// }

export const searchCountries = (name) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/country?name=${name}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`No se encontró ningún país con el nombre ${name}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.length === 0) {
                    window.alert(`No se encontró ningún país con el nombre ${name}`);
                } else {
                    const dataArray = [data];
                    dispatch({
                        type: SEARCH_COUNTRIES,
                        payload: dataArray
                    });
                }
            })
            .catch((error) => {
                console.error(`Error al buscar países bajo el nombre ${name}:`, error);
            });
    };
};