import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const FILTER_CONTINENT = "FILTER_CONTINENT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const FILTER_ACTIVITY = "FILTER_ACTIVITY";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const GET_NAME_COUNTRIES = "GET_NAME_COUNTRIES";
export const GET_DETAIL = "GET_DETAIL";
export const RESET_DETAIL = "RESET_DETAIL";
export const ORDENAR_CINCO = "ORDENAR_CINCO";

export function getAllCountries() {
  return async function (dispatch) {
    const reponse = await axios("http://localhost:3001/countries");
    return dispatch({
      type: GET_COUNTRIES,
      payload: reponse.data,
    });
  };
}

export function getAllActivities() {
  return async function (dispatch) {
    var response = await axios("http://localhost:3001/activities");
    return dispatch({
      type: GET_ACTIVITIES,
      payload: response.data,
    });
  };
}

export function postActivity(payload) {
  return async function (dispatch) {
    const activity = axios.post("http://localhost:3001/activities", payload);
    return dispatch({
      type: POST_ACTIVITY,
      payload: activity,
    });
  };
}

export function filterActivity(payload) {
  return {
    type: FILTER_ACTIVITY,
    payload,
  };
}

export function orderByContinent(payload) {
  return {
    type: FILTER_CONTINENT,
    payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: ORDER_BY_POPULATION,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function getCountriesByName(name) {
  return async function (dispatch) {
    try {
      var response = await axios(
        "http://localhost:3001/countries?name=" + name
      );
      return dispatch({
        type: GET_NAME_COUNTRIES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      alert("No exite el pais")
    }
  };
}

// export function ordenarCinco(){
//   return ({
//       type: ORDENAR_CINCO,
//     })
// }

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var response = await axios(`http://localhost:3001/countries/${id}`);
      // console.log(id);
      return dispatch({
        type: GET_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function resetDetail(){
  return (dispatch => {
    dispatch({
      type: RESET_DETAIL,
    })
  })
}