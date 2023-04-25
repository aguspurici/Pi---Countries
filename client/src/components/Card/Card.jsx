import React from "react";
import style from "./Card.module.css"
//import { Link } from "react-router-dom";


export default function Card({ flag, name, continent, id}) {
  return (
    <div key={id} >
      <div className={style.borde}>
        <div className={style.contenido}>
          <div><img className={style.imagen}  src={flag} alt="Flag" /></div>
          <div className={style.pais}><h3 >{name}</h3></div>
          <div><h3>{continent}</h3></div>
        </div>
      </div>
    </div>
  );
}
