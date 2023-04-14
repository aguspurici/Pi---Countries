import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../actions";
import Styles from "./SearchBar.module.css";

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
    <div className={Styles.searchBar}>
      <input
        type="text"
        placeholder="Buscar Pais..."
        onChange={(e) => handleInputChange(e)}
      ></input>
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}