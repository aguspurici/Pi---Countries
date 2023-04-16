import React from "react";
import { Link } from "react-router-dom"

export default function Card({ flag, name, continent, id}) {
  return (
    <div >
        
        <img src={flag} alt="img not found" width="80px" height="52px" />
        <h3>{name}</h3>
        <h3>{continent}</h3>
        <Link to={`/countries/${id}`}><button>Ver más</button></Link>
    </div>
  );
}
