import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivity, getAllActivities } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../NavBar/NavBar";
import styles from './Actividad.module.css'


export default function AddActivity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.countries);
  const [error, setError] = useState('');

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  function validate() {
    let error = {};
    if (!input.name) {
      error.name = "Completa el nombre";
    }
    if (!input.difficulty) {
      error.difficulty = "Elegi una dificultad";
    }
    if (!input.duration) {
      error.duration = " Elegi una duracion ";
    }
    if (!input.season) {
      error.season = " Elegi una temporada ";
    }
    if (!input.countries) {
      error.countries = " Elegi uno o varios paises ";
    }
    return error;
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleChoose(e) {
    setInput({
        ...input,
        [e.target.name]: e.target.value            
    })
}
  function handleDelete(e) {
    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== e), // filtrame por todo lo qe no sea ese elemento, me devuleve todo sin ese elemento.
    });
  }

  function handleSelect(e) {
    if (input.countries.find((p) => p === e.target.value)) {
      return;
    }
    setInput({
      ...input,
      countries: [...input.countries, e.target.value],
    });
  }

  function handleSubmit(e) {
    dispatch(postActivity(input));
    alert("Actividad Creada");
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  return (
    <div >
      <div>
       <Navbar/>
      </div>
      <div className={styles.header}>
      <h1>Crea tu actividad</h1>
      </div>
      <section className={styles.contenedorFormulario} >
      <div className={styles.formulario}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div>
          <><label className={styles.label} htmlFor='nombre' >Nombre</label>
                    <input className={styles.name} placeholder='Nombre de tu Actividad' type='text' id="name" name="name" value={input.name} onChange={(e)=>{handleChange(e)}} /></>
                    {error.name && <p className={styles.error}>{error.name}</p>}
          </div>
          <div >
          <><label className={styles.label} htmlFor='nombre' >Duracion</label>
                    <input className={styles.duration} name="duration" value={input.duration}  type='time'  min="01:00" max="12:00"  onChange={(e)=>{handleChange(e)}}/></>
                    {error.name && <p className={styles.error}>{error.duration}</p>}
          </div>
          <div>
                    
                    
                    
                    <label className={styles.label}>Dificultad</label>
                <div className={styles.contenedor} >
                    <label className={styles.label}>1</label>
                    <input className={styles.input} type="radio" id="1" value='1' name='difficulty' onChange={(e) => handleChoose(e)} />
                    <label className={styles.label}>2</label>
                    <input className={styles.input} type="radio" id="2" value='2' name='difficulty' onChange={(e) => handleChoose(e)} />
                    <label className={styles.label}>3</label>
                    <input className={styles.input} type="radio" id="3" value='3' name='difficulty' onChange={(e) => handleChoose(e)} />
                    <label className={styles.label}>4</label>
                    <input className={styles.input} type="radio" id="4" value='4' name='difficulty' onChange={(e) => handleChoose(e)}/>
                    <label className={styles.label}>5</label>
                    <input className={styles.input} type="radio" id="5" value='5' name='difficulty' onChange={(e) => handleChoose(e)}/>
                    </div>
                    {error.name && <p className={styles.error}>{error.difficulty}</p>}
          </div>
          <div >
          <label className={styles.label}>Temporada</label>
                    <div className={styles.contenedor} >
                
                     <label className={styles.label}>Verano </label>
                     <input className={styles.input}  type="radio" id="Summer" value='Summer' name='season' onChange={(e) => handleChoose(e)}/>
                     <label className={styles.label}>Otoño </label><input className={styles.input}  type="radio" id="Autumn" value='Autumn' name='season' onChange={(e) => handleChoose(e)}/>
                     <label className={styles.label}>Invierno </label><input className={styles.input}  type="radio" id="Winter" value='Winter' name='season' onChange={(e) => handleChoose(e)}/>
                     <label className={styles.label}>Primavera </label><input className={styles.input}  type="radio" id="Spring" value='Spring' name='season' onChange={(e) => handleChoose(e)}/>
                     </div>
                     {error.name && <p className={styles.error}>{error.season}</p>}
          </div>
          <div>
          <label className={styles.label}>Pais</label>
                    <select className={styles.country} placeholder='Selecciona el o los paises' name="countries" onChange={(e)=> handleSelect(e)} required>
                        <option className={styles.label}>Elegi los paises</option>
                    {countries?.map(element=> {
                        return (
                            <option  value={element.id} key={element.id}>{element.name}</option>
                        )
                    })}
                    </select>
                    {error.name && <p className={styles.error}>{error.countries}</p>}
            </div>
        </div>
        <div className={styles.contenedorC}> 
        {input.countries.map((country) => (
            <div className={styles.contenedorCountry} key={country.id}>
              <button className={styles.buttonClose} value={country} type="button" onClick={() => handleDelete(country)}>X</button>
              <p className={styles.parrafo}>{countries.find(c => c.id === country).name}</p>
            </div>
          ))}

        </div>
        <input  
          type="submit"
          value="Crear"
          disabled={
            !input.name ||
            !input.difficulty ||
            !input.duration ||
            !input.season ||
            !input.countries
          
          }></input>

      </form>
      </div>
      </section>

      <Link to="/home">
       <button className={styles.volver}>VOLVER</button>
      </Link>


    
      
    </div>
  );
}
