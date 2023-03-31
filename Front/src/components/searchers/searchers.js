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
import Select from "react-select";
import a from "./searchers.module.css";

export default function Searchers(currentPage) {
    const dispatch = useDispatch();
    const estado = useSelector((state) => state);
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    const [errorSearch, setErrorSearch] = useState({
      breed: "",
      temperament: "",
    });

    const [selectedOrder, setSelectedOrder] = useState("");

    //Ordenamiento cargado
    function changeOrder(e) {
      if (e === "aAscendente") {
        dispatch(changeOrder("aAscendente"));
      } else if (e === "aDescendente") {
        dispatch(changeOrder("aDescendente"));
      } else if (e === "pAscendente") {
        dispatch(changeOrder("pAscendente"));
      } else if (e === "pDescendente") {
        dispatch(changeOrder("pDescendente"));
      }
    }

    //Carga inicio
    useEffect(() => {
      if (estado.breeds.length === 0) {
        dispatch(loadDogs());
      }
      let orderaAsc = document.getElementById("aAscendente");
      let orderaDes = document.getElementById("aDescendente");
      let orderpAsc = document.getElementById("pAscendente");
      let orderpDes = document.getElementById("pDescendente");
      /*    if(estado.orderSelected === "aAscendente") {
        orderaAsc.checked = true
      } else if (estado.orderSelected === "aDescendente") {
        orderaDes.checked = true
      } else if (estado.orderSelected === "pAscendente") {
        orderpAsc.checked = true
      } else if (estado.orderSelected === "pDescendente") {
        orderpDes.checked = true
      } */
      console.log(orderaAsc.checked);
      //if(!orderaAsc.checked){  //intentar haciendo controled el form
      orderaDes.checked = false;
      //}
    }, []);

    useEffect(() => {
        let orderaAsc = document.getElementById("aAscendente");
        let orderaDes = document.getElementById("aDescendente");
        let orderpAsc = document.getElementById("pAscendente");
        let orderpDes = document.getElementById("pDescendente");
            if(estado.orderSelected === "aAscendente") {
          orderaAsc.checked = true
        } else if (estado.orderSelected === "aDescendente") {
          orderaDes.checked = true
        } else if (estado.orderSelected === "pAscendente") {
          orderpAsc.checked = true
        } else if (estado.orderSelected === "pDescendente") {
          orderpDes.checked = true
        } 
    },[estado])

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
    //traer temperamentos
    useEffect(() => {
      dispatch(loadTemperaments());
    }, []);
    //Set temperaments para buscar
    function filterTemperaments(e) {
      setSelectedTemperaments(e);
    }

    function roderrre() {
      let hola = document.getElementById("pDescendente");

      hola.checked = true;
    }


    return (
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
                    currentPage()
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
                    currentPage()
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
                changeOrder(e)
              }}
            />
            <span>Alfabeticamente ascendente</span>
          </label>
              <button onClick={() => roderrre()}>asd</button>
          <label className={a.filter} htmlFor="aDescendente">
            <input
              name="order"
              type="radio"
              value="aDescendente"
              id="aDescendente"
              onChange={(e) => {
                dispatch(orderdes())
                changeOrder(e)
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
                changeOrder(e)
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
                changeOrder(e)
              }}
            />
            <span>Peso descendente</span>
          </label>
        </div>
      </div>
    )
}