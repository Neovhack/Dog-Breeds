import React, { useEffect }from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { searchDoId } from "../../actions/index"
import Nav from "../nav/nav"
import Loading from "../loading/loading"
import a from "./details.module.css"

export default function Details() {
    const dispatch = useDispatch();
    const estado = useSelector(state => state);
    const { id } = useParams()
    
    useEffect(() =>{
      dispatch(searchDoId(id))
    },[])    
    let imageNull = estado.dogId.image
    return (
      <div>
      <Nav></Nav>
      {
        estado.loading
        ? <Loading/>
        :<div className={a.formCreate}>
        <div className={a.signupContainer}>
              {
                    imageNull 
                    ?
                    <div className={a.leftContainer}>
                      <div className={a.puppy}> 
                        <img className={a.imageDetails} src={estado.dogId.image} alt={estado.dogId.name} />
                      </div>  
                    </div>
                    : <>
                      <div className={a.cardImageNull}><p className={a.cardImageNullText}>Ninguna Imagen Cargada</p>  </div>
                    </>
                  }
          <div className={a.rightContainer}>
            <header>
              <h1>{estado.dogId.name} </h1>
              <div className={a.set}>
                    <p> Altura:  {estado.dogId.height} </p>
                    <p>Peso:  {estado.dogId.weight}</p>
              </div>
              <div className={a.set}>
                  <p>Esperanza de vida: {estado.dogId.weight}</p>
              </div>
              <div className={a.petsTemperamets}>
                <p>Temperamentos: {estado.dogId.temperament}</p>
              </div>
            </header>
          </div>
        </div>
      </div>
      }
    </div>
    )
}