import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css"
import logo from './pin.png'

export default function Landing(){

  return(
    <div className={style.container}>
      <div className={style.image}>
        <div  className={style.contenedorLogo} >
          <div className={style.countryLogo}>
            <div>
              <p className={style.country} >Countrie's App</p>
            </div>
            <div>
              <img src={logo} alt="logo"  className={style.logo}/>
            </div>
          </div>
        </div>
        <div className={style.home}>
          <Link to="/home">
            <button className={style.button} >INICIO</button>
          </Link>
        </div>
      </div>
    </div>
  )
}