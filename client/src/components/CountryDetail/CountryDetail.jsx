import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDetail, resetDetail} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../NavBar/NavBar";
import styles from "./Detail.module.css"


export default function CountryDetail(props) {

  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  console.log(detail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    dispatch(resetDetail());
  }, [dispatch, props.match.params.id]);
  
  return (
    <div >
      <Navbar/>
      <div className={styles.header}>
        <Link to="/home">
          <button className={styles.volver} >VOLVER</button>
        </Link>
        <div>Descripcion de {detail.name}</div>
        <Link to="/activities">
          <button className={styles.crear}>CREAR ACTIVIDAD</button>
        </Link>

      </div>
      
      {Object.keys(detail).length ? ( 
        <div>
        <section className={styles.contenedor}>
          <img  src={detail.flag} alt="flag" className={styles.imagen} />
          <div className={styles.detalles}>
            <p>Nombre: {detail.name}</p>
            <p>Id: {detail.id}</p>
            <p>Capital: {detail.capital}</p>
            <p>Continente: {detail.continent}</p>
            <p>Subregion: {detail.subregion}</p>
            <p>Area: {detail.area} Km2</p>
            <p>Poblacion: {detail.population}</p>
          </div>
        </section>
  
          <div className={styles.activity}>
            {detail.activities?.map((activity) => {
              return (
                <div  className={styles.boxActivity}>
                  <p>Actividad</p>
                  <p>Nombre: {activity.name}</p>
                  <p>Dificultad: {activity.difficulty}</p>
                  <p>Duracion: {activity.duration}</p>
                  <p>Temporada: {activity.season}</p>
                </div>
              );
             })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
