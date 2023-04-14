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
    //ORDENAR_CINCO,
  } from "../actions/actions";
  
  const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    detail: [],
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_COUNTRIES:
        return {
          ...state,
          countries: action.payload,
          allCountries: action.payload,
        };
      
      case GET_NAME_COUNTRIES:
        return {
          ...state,
          countries: action.payload,
        }
  
      case FILTER_CONTINENT:
        const everyCountries = state.allCountries;
        const filterContinent =
          action.payload === "All"
            ? everyCountries
            : everyCountries.filter((c) => c.continent === action.payload);
        return {
          ...state,
          countries: filterContinent,
        };
  
      case FILTER_ACTIVITY:
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
  
      // case ORDENAR_CINCO:
      //   const orderFive = 
      //       state.countries.sort((a, b) => {
      //           if (a.name < b.name) {
      //             return -1;
      //           }
      //           if (a.name > b.name) {
      //             return 1;
      //           }
      //           return 0;
      //         })
  
      //   const ordenar = orderFive.slice(0, 5)      
      //   return {
      //     ...state,
      //     countries: ordenar,
      //   };
  
      case ORDER_BY_NAME:
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
  
      case ORDER_BY_POPULATION:
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
  
      case GET_ACTIVITIES:
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
  