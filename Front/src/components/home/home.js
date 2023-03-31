import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadDogs,
  breedSearcher,
  loadTemperaments,
  temperamentsSearcher,
  orderdes,
  orderasc,
  orderdesWeight,
  orderascWeight,
  changeOrder,
} from "../../actions/index";
import Breed from "./breed";
import Loading from "../loading/loading";
import Nav from "../nav/nav";
import Select from "react-select";
import a from "./home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const estado = useSelector((state) => state);

  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const [errorSearch, setErrorSearch] = useState({
    breed: "",
    temperament: ""
  })

  const [selectedOrder, setSelectedOrder] = useState()

  //Carga inicio 
  useEffect(() => {
    if (estado.breeds.length === 0 ){
      dispatch(loadDogs())
    }
/*      let orderaAsc = document.getElementById("aAscendente")
    let orderaDes = document.getElementById("aDescendente")
    let orderpAsc = document.getElementById("pAscendente")
    let orderpDes = document.getElementById("pDescendente")
    if(estado.orderSelected === "aAscendente") {
      console.log(1);
      orderaAsc.checked = true
    } else if (estado.orderSelected === "aDescendente") {
      console.log(2);
      orderaDes.checked = true
    } else if (estado.orderSelected === "pAscendente") {
      orderpAsc.checked = true
    } else if (estado.orderSelected === "pDescendente") {
      orderpDes.checked = true
    }  */
    //console.log(orderaAsc.checked);aAscendente
    //if(!orderaAsc.checked){  //intentar haciendo controled el form
     // orderaDes.checked = false
    //}
    
  }, [])

  useEffect(() => {
    let orderaAsc = document.getElementById("aAscendente")
    let orderaDes = document.getElementById("aDescendente")
    let orderpAsc = document.getElementById("pAscendente")
    let orderpDes = document.getElementById("pDescendente")
    if(estado.orderSelected === "aAscendente") {
      orderaAsc.checked = true
    } else if (estado.orderSelected === "aDescendente") {
      console.log(orderaDes);
      console.log(orderaDes.checked);
      orderaDes.checked = true
      setSelectedOrder("aDescendente")
    } else if (estado.orderSelected === "pAscendente") {
      orderpAsc.checked = true
    } else if (estado.orderSelected === "pDescendente") {
      orderpDes.checked = true
    } 
    console.log(estado.orderSelected);
  },[estado.orderSelected])

  //Busqueda seleccionada
  const [searcherSelected, setSearcherSelected] = useState({
    breed: true,
    temperament: false,
  });
  function searchChanger(selected) {
    if (selected === "breed") {
      setSearcherSelected({ breed: true, temperament: false });
    } else if (selected === "temperament") {
      setSearcherSelected({ breed: false, temperament: true });
    }
  }

  //Paginado
  const CANT_PER_PAGE = 8;
  const [itemsPerPage, setitemsPerPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [nPages, setNPages] = useState();
  const [limitNumber, setLimitNumber] = useState([]);
  //Next
  const nextHandler = () => {
    const totalBreeds = estado.breeds.length;
    const nextPage = currentPage + 1;
    //Index para la siguiente pagina
    const firstIndex = nextPage * CANT_PER_PAGE;
    //limite
    if (firstIndex >= totalBreeds) return;
    setitemsPerPage([...estado.breeds].splice(firstIndex, CANT_PER_PAGE));
    setCurrentPage(nextPage);
  };
  //Prev
  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * CANT_PER_PAGE;
    setitemsPerPage([...estado.breeds].splice(firstIndex, CANT_PER_PAGE));
    setCurrentPage(prevPage);
  };
  //Pages
  useEffect(() => {
    setitemsPerPage([...estado.breeds].splice(0, CANT_PER_PAGE));
    setNPages(Math.ceil(estado.breeds.length / CANT_PER_PAGE));
  }, [estado]);
  //Numero de paginas
  useEffect(() => {
    if(typeof estado.breeds !== "string"){
      if (nPages !== 0 && nPages !== undefined) {
        setLimitNumber([...Array(nPages + 1).keys()].slice(1));
      } 
    }else {
      setLimitNumber([])
    }
  }, [nPages]);

  //traer temperamentos
  useEffect(() => {
    dispatch(loadTemperaments());
  }, []);
  //Set temperaments para buscar
  function filterTemperaments(e) {
    setSelectedTemperaments(e);
  }

  function roderrre() {
    let hola = document.getElementById("pDescendente")
    console.log(estado.orderSelected);
    hola.checked = true
  }

  if (estado.loading) {
    return (
      <div>
        <div className="App">
          <Nav></Nav>
        </div>
        <Loading />
      </div>
    )
  } else if (estado.serverResponse === "Hubo un error con el servidor"){
    return (
      <div>
      <div className="App">
        <Nav></Nav>
      </div>
      <p>Hubo un error con el servidor</p>
    </div>
    )
  } else {
    return (
      <div>
        <div className="App">
          <Nav></Nav>
        </div>
        <div className={a.containerSandF}>
          <div >
            <h5>Elegi el tipo de busqueda: </h5>
            <div className={a.searchers}>
            <label className={a.filter} htmlFor="breedSearch">
              <input
                name="search"
                type="radio"
                value="breedSearch"
                id="breedSearch"
                onChange={() => searchChanger("breed")}
              />
              <span>Raza</span>
            </label>
            {!searcherSelected.breed ? null : (
              <div className={a.divSearcher}>
                <input className={a.searchTerm}
                  type="text"
                  id="breedName"
                  name="breedName"
                  placeholder="Ingrese la raza"
                />
                <button className={a.searchButton}
                  onClick={() => {
                    let value = document.getElementById("breedName").value;
                    let valueLowerCase = value.toLowerCase();
                    if (valueLowerCase){
                      setCurrentPage(0)
                      dispatch(breedSearcher(valueLowerCase));
                      setErrorSearch({breed: ""})
                    } else {
                      setErrorSearch({breed:"Campo vacio"})
                    }
                  }}
                >
                  Buscar
                </button>
                {!(errorSearch.breed === "Campo vacio") ? null : (
                    <span className={a.alert}>{errorSearch.breed}</span>
                  )}
                <br />
              </div>
            )}
            <label className={a.filter} htmlFor="temperamentSreach">
              <input
                name="search"
                type="radio"
                id="temperamentSreach"
                value="temperamentSreach"
                onChange={() => searchChanger("temperament")}
              />
              <span>Temperamentos</span>
              </label>
            <br />
            {!searcherSelected.temperament ? null : (
              <div>
                <Select
                  isMulti
                  name="temperaments"
                  value={selectedTemperaments}
                  options={estado.temperaments.map((e) => ({
                    value: e.name,
                    label: e.name,
                  }))}
                  placeholder="Seleccionar temperamentos"
                  onChange={(e) => filterTemperaments(e)}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
                  <button className={a.searchButton}
                  onClick={() => {
                    if (selectedTemperaments.length !== 0){
                      setCurrentPage(0)
                      dispatch(temperamentsSearcher(selectedTemperaments))
                      setSelectedTemperaments([])
                      setErrorSearch({temperament: ""})
                    } else {
                      setErrorSearch({temperament : "Campo vacio"})
                    }
                  }}
                >
                  Buscar
                </button>
                {!(errorSearch.temperament === "Campo vacio") ? null : (
                    <span className={a.alertT}>{errorSearch.temperament}</span>
                  )}
              </div>
            )}
            </div>
          </div>
          <div>
            <h5>Ordenar por:</h5>
            <label className={a.filter} htmlFor="aAscendente">
              <input
                name="order"
                type="radio"
                value="aAscendente"
                id="aAscendente"
                onChange={(e) => {
                  dispatch(orderasc())
                  dispatch(changeOrder("aDescendente"))
                }}
              />
              <span>Alfabeticamente ascendente</span>
            </label>
            <label className={a.filter} htmlFor="aDescendente">
              <input
                name="order"
                type="radio"
                value={selectedOrder}
                id="aDescendente"
                onChange={(e) => {
                  dispatch(orderdes())
                  dispatch(changeOrder("aDescendente"))
                }}
              />
              <span>Alfabeticamente descendente</span>
            </label>
            <label className={a.filter} htmlFor="pAscendente">
              <input
                name="order"
                type="radio"
                value="pAscendente"
                id="pAscendente"
                onChange={(e) => {
                  dispatch(orderascWeight())
                  dispatch(changeOrder("pAscendente"))
                }}
              />
              <span>Peso ascendente</span>
            </label>

            <label className={a.filter} htmlFor="pDescendente">
              <input
                name="order"
                type="radio"
                id="pDescendente"
                value="pDescendente"
                onChange={(e) => {
                  dispatch(orderdesWeight())
                  dispatch(changeOrder("pDescendente"))
                }}
              />
              <span>Peso descendente</span>
            </label>
          </div>
        </div>
        <div className={a.containerCards}>
          {estado.loading
            ? <Loading/>
            :  estado.breeds === "No hay ninguna raza con la palabra ingresada" 
            ?  <p className={a.errEmpty}>{estado.breeds}</p> 
            : estado.breeds === "No hay resultados"
            ? <p className={a.errEmpty}>{estado.breeds}</p> 
            : itemsPerPage.map((e) => (
              <Breed
                key={e.id}
                id={e.id}
                name={e.name}
                temperament={e.temperament}
                image={e.image}
                weight={e.weight}
                height={e.height}
              />
            ))
          }
        </div>
        <div className={a.pagination}>
          {
            limitNumber.length === 0 
            ? null
            : <a onClick={() => prevHandler()}>&laquo;</a>
          }
          {!limitNumber
            ? null
            :  limitNumber.map((number ,index) => {
                  return( 
                  <a 
                  key={number}
                  className={currentPage  === index ? a.active : ""}
                  >{number}</a>)}
                  ) 
          }
            {
            limitNumber.length === 0 
            ? null
            :  <a onClick={() => nextHandler()}>&raquo;</a>
          }
        </div>
      </div>
    );
  }
}
