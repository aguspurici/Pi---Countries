import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllCountries,
  getAllActivities,
  orderByContinent,
  filterActivity,
  orderByName,
  orderByPopulation,
} from "../../redux/actions/actions";
import Card from "../Card/Card";
import Paginado from "../Paginate/Paginate";
import Navbar from "../NavBar/NavBar";
import style from "./AllCards.module.css"


export default function Home() {
  const dispatch = useDispatch(); //despachar acciones a los reducers para actualizar el estado global de la aplicacion
  const countries = useSelector((state) => state.countries); //obtiene es estado global de countries y lo almacena en la const countries 
  const activities = useSelector((state) => state.activities);
  const [, setOrden] = useState(""); //se crea un estado local, setorden se usa para actualizarlo  
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);


  //paginacion
  const indexOfLastCountry = currentPage * countriesPerPage; 
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountry = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  function search() {
    setCurrentPage(1);
  }

  const paginate = (pageNumber) => { 
    setCurrentPage(pageNumber);
  };

  useEffect(() => { //ejecuta una accion cuando el componente es montado oo disdpatch cambia
    dispatch(getAllCountries()); // se despachan estas dos acciones, hacen peticiones al servidor, paises y actividades, y se actualiza el esyado 
    dispatch(getAllActivities());
  }, [dispatch]); 

  function handleClick(e) { //borrar los filtros y devolver la pagina actual en 1
    setCurrentPage(1);
    e.preventDefault();
    dispatch(getAllCountries());
  }
  // Función que maneja el ordenamiento de los países por nombre
  function handleSort(e) {
    e.preventDefault(); //evitar que el navegador realice la acción predeterminada
    setCurrentPage(1);
    dispatch(orderByName(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSort2(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByPopulation(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleFilterContinent(e) {
    setCurrentPage(1);
    dispatch(orderByContinent(e.target.value));
  }

  function handleFilterActivity(e) {
    setCurrentPage(1);
    dispatch(filterActivity(e.target.value));
  }

  return (
    <div >
      <div onChange={(e) => search(e)}>
        <Navbar />
      </div>
      <div >
        <button         
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Todos los paises
        </button>
      </div>
      <div >
        <nav className={style.opciones}>

          <select  className={style.poblacion} 
            onChange={(e) => handleFilterContinent(e)} >
            <option selected disabled value="">
              CONTINENTE
            </option>
            <option value="All">Todos</option>
            <option value="Africa">Africa</option>
            <option value="Antarctica">Antartida</option>
            <option value="North America">America del Norte</option>
            <option value="South America">America del Sur</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europa</option>
            <option value="Oceania">Oceania</option>
          </select>

          <select className={style.orden} onChange={(e) => handleSort(e)} >
            <option selected disabled value="">
              ORDEN
            </option>
            <option value="asc">Asc</option>
            <option value="desc">Des</option>
          </select>

          <select className={style.poblacion} onChange={(e) => handleSort2(e)} >
            <option selected disabled value="">
              POBLACION
            </option>
            <option value="asc">Asc</option>
            <option value="desc">Des</option>
          </select>

          <select className={style.actividad} onChange={(e) => handleFilterActivity(e)}>
            <option selected disabled value="">
              ACTIVIDAD
            </option>
            {activities?.map((act) => {
              return (
                <option id={act.id} key={act.id} value={act.name}>
                  {act.name}
                </option>
              );
            })}
          </select>
        </nav>
      </div>
      <div className={style.cardContent}>
        {currentCountry?.map((country) => {
          return (
            <div key={country.id}>
              <Link to={"/detail/" + country.id} >
                <Card
                  id={country.id}
                  name={country.name}
                  flag={country.flag}
                  continent={country.continent}
                />
              </Link>
            </div>
          );
        })}
      </div>
      <div >
        <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={countries.length}
          paginate={paginate}
        />
      </div> 
            
    </div>
  );
}

