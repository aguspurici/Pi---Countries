import {
    FILTER_ACTIVITY,
    GET_COUNTRIES,
    POST_ACTIVITY,
    FILTER_CONTINENT,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
    GET_ACTIVITIES,
    GET_NAME_COUNTRIES,
    GET_DETAIL,
    RESET_DETAIL,
  } from "../actions/actions";
  
  const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    detail: [],
  };
  
  function rootReducer(state = initialState, action) { // toma el estado actual de la aplicación y una acción, y devuelve un nuevo estado actualizado según el tipo de acción.
    switch (action.type) {
      case GET_COUNTRIES: // actualiza la lista de paises y guarda una copia para poder filtrar despues
        return {
          ...state,
          countries: action.payload,
          allCountries: action.payload,
        };
      
      case GET_NAME_COUNTRIES: // actualiza la lista de paises basada en un filtro por nombre
        return {
          ...state,
          countries: action.payload,
        }
  
      case FILTER_CONTINENT: // Filtra los países por continente y actualiza la lista de países
        const everyCountries = state.allCountries;
        const filterContinent =
          action.payload === "All"
            ? everyCountries
            : everyCountries.filter((c) => c.continent === action.payload);
        return {
          ...state,
          countries: filterContinent,
        };
  
      case FILTER_ACTIVITY: // // Filtra los países por actividad
        const countriesAll = state.allCountries;
        const filterActivities =
          action.payload === "All"
            ? countriesAll.filter((c) => c.activities)
            : countriesAll.filter(
                (c) =>
                  c.activities &&
                  c.activities.map((a) => a.name).includes(action.payload)
              );
        return {
          ...state,
          countries: filterActivities,
        };
  

  
      case ORDER_BY_NAME: // Ordena los países por nombre de forma asc o des
        const orderByName =
          action.payload === "asc"
            ? state.countries.sort((a, b) => {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              })
            : state.countries.sort((a, b) => {
                if (a.name < b.name) {
                  return 1;
                }
                if (a.name > b.name) {
                  return -1;
                }
                return 0;
              });
        return {
          ...state,
          countries: orderByName,
        };
  
      case ORDER_BY_POPULATION:  // Ordena los países por población de forma ascendente o descendente
        const orderByPopulation =
          action.payload === "asc"
            ? state.countries.sort((a, b) => {
                if (a.population < b.population) {
                  return -1;
                }
                if (a.population > b.population) {
                  return 1;
                }
                return 0;
              })
            : state.countries.sort((a, b) => {
                if (a.population < b.population) {
                  return 1;
                }
                if (a.population > b.population) {
                  return -1;
                }
                return 0;
              });
        return {
          ...state,
          countries: orderByPopulation,
        };
  
      case GET_ACTIVITIES: // Actualiza la lista de actividades
        return {
          ...state,
          activities: action.payload,
        };
  
      case POST_ACTIVITY:
        return {
          ...state,
        };
  
      case GET_DETAIL:
        return {
          ...state,
          detail: action.payload
        };
        
      case RESET_DETAIL:
        return {
          ...state,
          detail: []
        }  
  
      default:
        return {
          ...state,
        };
    }
  }
  
  export default rootReducer;
  