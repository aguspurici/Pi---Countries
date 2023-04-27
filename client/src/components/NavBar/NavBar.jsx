import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import logo from './pin.png'
import style from "./NavBar.module.css"

export default function Navbar() {

    return (
      <nav className={style.contenedor}>
          <div>
            <Link to='/' >
              <img  className={style.logo} src={logo}alt="logo"/>
            </Link>
          </div>
          <div >
            <SearchBar/>
          </div>
          <div >
            <Link to='/activities' className={style.textCreate} >
              <button className={style.nuevaActividad}  >NUEVA ACTIVIDAD</button>
            </Link>
          </div>
      </nav>
    )
  } 
