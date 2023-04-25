
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
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);

  const [, setOrden] = useState("");



  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);

 

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

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllActivities());
  }, [dispatch]);

  function handleClick(e) {
    setCurrentPage(1);
    e.preventDefault();
    dispatch(getAllCountries());
  }

 

  function handleSort(e) {
    e.preventDefault();
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
      <Navbar />
      <div >
        <button
          
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Todos los paises
        </button>
        <div >
        </div>
      </div>
      <div >
        <nav className={style.opciones}>
          <select  className={style.poblacion} 
            onChange={(e) => handleFilterContinent(e)} >
            <option>
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
            <option>
              ORDEN
            </option>
            <option value="asc">Asc</option>
            <option value="desc">Des</option>
          </select>

          <select className={style.poblacion} onChange={(e) => handleSort2(e)} >
            <option>
              POBLACION
            </option>
            <option value="asc">Asc</option>
            <option value="desc">Des</option>
          </select>

         

          <select className={style.actividad} onChange={(e) => handleFilterActivity(e)}>
            <option>
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
          <div onChange={(e) => search(e)} >       
          </div>
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

