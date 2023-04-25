import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../redux/actions/actions";
import style from "./SearchBar.module.css"


export default function SearchBar() {

  const dispatch = useDispatch();
  const [name, setName] = useState(""); // yo voy a estar guardando lo que tipea el usuario en mi estado local name
  
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) { // aca despacho mi accion
    e.preventDefault();
    if (name.length === 0) return alert('Busca un pais')
    dispatch(getCountriesByName(name));
  }
  return (
    <div className={style.contenedor} >
      <input className={style.input}
        type="text"
        placeholder="Por ejemplo: Argentina"
        onChange={(e) => handleInputChange(e)}
      ></input>
      <button className={style.button} type="submit" onClick={(e) => handleSubmit(e)}>
        BUSCAR
      </button>
    </div>
  )
}



