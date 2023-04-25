import React from "react";
import style from "./paginate.module.css"

export default function Paginado({ countriesPerPage, allCountries, currentPage, paginate }) {
  const pageNumbers = Array.from({ length: Math.ceil(allCountries / countriesPerPage) }, (_, i) => i + 1);
  return (
    <nav>
      <div className={style.paginado} >
        {pageNumbers.map((number) => (
          <button className={style.boton}
            key={number}
            onClick={() => paginate(number)}
            disabled={currentPage === number}
          >
            {number}
          </button>
        ))}
      </div>
    </nav>
  );
}
