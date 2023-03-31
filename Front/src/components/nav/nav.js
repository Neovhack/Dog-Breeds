import React from "react";
import { useDispatch, useSelector } from "react-redux";
import a from "./nav.module.css";
import {
  breedSearcher
} from "../../actions/index";
import huella from "./huella.png"
import { Link } from "react-router-dom";

export default function Nav() {
  const dispatch = useDispatch();

  return (
    <div>

      <nav>
          <div className={a.nav}>
          <header >
          <Link to={"/"}><img className={a.logo} src={huella}></img></Link>
            <h1 className={a.title}>Henry Dogs</h1>
            </header>
            <div className={a.search}>
            <input  className={a.searchTerm}
              type="text"
              id="breedNameNav"
              name="breedName"
              placeholder="Ingrese la raza"
            />
            <button className={a.searchButton}
              onClick={() => {
                let value = document.getElementById("breedNameNav").value;
                let valueLowerCase = value.toLowerCase();
                dispatch(breedSearcher(valueLowerCase));
              }}
            >
              Buscar
            </button>
            </div>
            <ul>             
                <Link className={a.links} to={"/"}><li>Principal </li></Link>
                <Link className={a.links} to="/creator"><li>Crear Perro</li></Link>             
            </ul>
          </div>
      </nav>
    </div>
  );
}
