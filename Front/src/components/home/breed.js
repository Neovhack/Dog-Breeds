import React from "react";
import { Link } from 'react-router-dom';
import a from "./breed.module.css"

export default function Breed({id, name, temperament, image, weight, height}) {
    let imageNull = image
    return (
        <div className={a.container}>
          <div className={a.card}>
            <div className={a.cardContainer}>
              <div className={a.cardFront}>
                  {
                    imageNull 
                    ? <img className={a.cardImage}  src={image} alt={name}/>
                    : <>
                      <div className={a.cardImageNull} alt={name}><p className={a.cardImageNullText}>Ninguna Imagen Cargada</p>  </div>
                    </>
                  }
                <div className={a.cardTextWrapper}>
                  <h3 className={a.cardHeading}>{name}</h3>
                  <h4 className={a.cardSubHeading}>Peso: {weight}</h4>
                  <h4 className={a.cardSubHeading}>Altura: {height}</h4>
                  <h4 className={a.cardSubHeading}>
                    Temperamentos: {temperament}
                  </h4>
                  <Link
                    className={`${a.cardTrigger} ${a.linkStyled}`}
                    to={`/details/${id}`}
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}