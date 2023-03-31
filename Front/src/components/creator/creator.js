import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDog, loadTemperaments } from "../../actions/index";
import Select from "react-select";
import Nav from "../nav/nav";
import a from "./creator.module.css";

export default function Creator() {
  const dispatch = useDispatch();
  const estado = useSelector((state) => state);

  const [loadingCreate ,setLoadingCreate] = useState(false);

  const [breeds, setBreeds] = useState({
    breed: "",
    height: "",
    weight: "",
    life_span: "",
    temperaments: [],
  });
  const [height, setHeight] = useState({
    minheight: "",
    maxheight: "",
  });
  const [weight, setWeight] = useState({
    minweight: "",
    maxweight: "",
  });
  const [error, setError] = useState({
    breeErr: "",
    heightErr: "",
    weightErr: "",
    life_spanErr: "",
  });
  //estados para promedio o minAndMax
  const [choiseSelected, setChoiseSelected] = useState({
    choiseSelectedH: "PromedioH",
    choiseSelectedW: "PromedioW",
  });
  function changerChoise(e) {
    if (e.target.value === "PromedioH" || e.target.value === "MinMaxH") {
      setChoiseSelected({ ...choiseSelected, choiseSelectedH: e.target.value });
      if (e.target.value === "PromedioH") {
        setHeight({ ...height, minheight: "", maxheight: "" });
      } else if (e.target.value === "MinMaxH") {
        setBreeds({ ...breeds, height: "" });
      }
    } else {
      setChoiseSelected({ ...choiseSelected, choiseSelectedW: e.target.value });
      if (e.target.value === "PromedioW") {
        setWeight({ ...weight, minweight: "", maxweight: "" });
      } else if (e.target.value === "MinMaxW") {
        setBreeds({ ...breeds, weight: "" });
      }
    }
  }
  
  //traer temperamentos
  useEffect(() => {
    dispatch(loadTemperaments());
  }, []);

  function onChangeForm(e) {
    //regExpre
    var regExpre = /^[A-Za-z\s]*$/;
    var regExpreNum = /^[0-9 ]*$/;
    //temperaments
    if (e.length !== undefined) {
      setBreeds({ ...breeds, temperaments: e });
      return;
    }
    //breeds
    if (e.target.name === "breed") {
      if (!e.target.value.match(regExpre)) {
        setError({ breeErr: "Only letters" });
      } else {
        setError({ breeErr: "" });
        setBreeds({ ...breeds, [e.target.name]: e.target.value });
      }
    }
    //life_span
    else if (e.target.name === "life_span") {
      if (!e.target.value.match(regExpreNum)) {
        setError({ life_spanErr: "Only Numbers" });
      } else {
        setError({ life_spanErr: "" });
        setBreeds({ ...breeds, [e.target.name]: e.target.value });
      }
    }
    //height
    else if (e.target.name === "height") {
      if (!e.target.value.match(regExpreNum)) {
        setError({ heightErr: "Only numbers" });
      } else {
        setError({ heightErr: "" });
        setBreeds({ ...breeds, [e.target.name]: e.target.value });
      }
    }
    //weight
    else if (e.target.name === "weight") {
      if (!e.target.value.match(regExpreNum)) {
        setError({ heightErr: "Only numbers" });
      } else {
        setError({ heightErr: "" });
        setBreeds({ ...breeds, [e.target.name]: e.target.value });
      }
    }
    //Min-Max height
    else if (e.target.name === "minheight" || e.target.name === "maxheight") {
      if (!e.target.value.match(regExpreNum)) {
        setError({ heightErr: "Only numbers" });
      } else {
        setError({ heightErr: "" });
        setHeight({ ...height, [e.target.name]: e.target.value });
      }
      //Min-Max weight
    } else if (e.target.name === "minweight" || e.target.name === "maxweight") {
      if (!e.target.value.match(regExpreNum)) {
        setError({ weightErr: "Only numbers" });
      } else {
        setError({ weightErr: "" });
        setWeight({ ...weight, [e.target.name]: e.target.value });
      }
    }
  }

  function dogPost(e) {
    e.preventDefault();

    //temps
    let arrtemps = [];
    for (let index = 0; index < breeds.temperaments.length; index++) {
      arrtemps.push(breeds.temperaments[index].value);
    }
    let stringTemps = arrtemps.join(",");
    //Objeto a updetear
    if (breeds.breed === "") {
      return setError({ breeErr: "Nombre no puede estar vacio" });
    } else {
      setError({ breeErr: "" });
    }
    if (breeds.weight === "") {
      if( weight.minweight === "" || weight.maxweight === "") {
        return setError({ weightErr: "Peso no puede estar vacio" });
      }
    } else {
      setError({ weightErr: "" });
    }
    if (breeds.height === "") {
      if(height.minheight === "" || height.maxheight === "") {
        return setError({ heightErr: "Altura no puede estar vacio" });
      }
    } else {
      setError({ heightErr: "" });
    }
    if (breeds.life_span === "") {
      return setError({ life_spanErr: "Años de vida no puede estar vacio" });
    } else {
      setError({ life_spanErr: "" });
    }
    if (arrtemps.length === 0) {
      stringTemps = "No hay temperamentos";
    }
    let newDog = {}
    if( weight.minweight !== "" && breeds.height){
      newDog = {
        name: breeds.breed,
        weight: `${weight.minweight} - ${weight.maxweight}`,
        height: breeds.height,
        life_span: breeds.life_span,
        temperament: stringTemps,
      };
    } else if (height.minheight !== "" && breeds.weight) {
      newDog = {
        name: breeds.breed,
        weight: breeds.weight,
        height: `${height.minheight} - ${height.maxheight}`,
        life_span: breeds.life_span,
        temperament: stringTemps,
      };
    } else if (height.minheight !== "" && weight.minweight !== ""){
      newDog = {
        name: breeds.breed,
        weight: `${weight.minweight} - ${weight.maxweight}`,
        height: `${height.minheight} - ${height.maxheight}`,
        life_span: breeds.life_span,
        temperament: stringTemps,
      };
    } else {
      newDog = {
        name: breeds.breed,
        weight: breeds.weight,
        height: breeds.height,
        life_span: breeds.life_span,
        temperament: stringTemps,
      };
    }
  dispatch(addDog(newDog));
  }
  return (
    <div>
      <Nav></Nav>
      <form className={a.formCreate}>
        <div className={a.signupContainer}>
          <div className={a.leftContainer}>
            <div className={a.puppy}>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-542207-jpeg.png" />
            </div>
          </div>
          <div className={a.rightContainer}>
            <header>
              {/*breed*/}
              <h1>Crea tu propia raza! </h1>
              <div className={a.set}>
                <div className={a.breedsName}>
                  <label htmlFor="breed">
                    Raza<span className={a.spanObligatorio}> * </span>:{" "}
                  </label>
                  <input
                    type="text"
                    id="breed"
                    name="breed"
                    placeholder="Raza"
                    value={breeds.breed}
                    onChange={(e) => onChangeForm(e)}
                  />
                  <br />
                  {!(error.breeErr === "Nombre no puede estar vacio") ? null : (
                    <span className={a.alert}>{error.breeErr}</span>
                  )}
                  <br />
                </div>
              </div>

              {/* Altura */}
              <div className={a.set}>
                <div className={a.petsProperties}>
                  <div className={a.petsPropertiesA}>
                    <label htmlFor="hight">
                      Altura(cm)<span className={a.spanObligatorio}> * </span>:
                    </label>
                    <div className={a.radioContainer}>
                      <input
                        id="PromedioH"
                        name="height"
                        type="radio"
                        value="PromedioH"
                        defaultChecked
                        onChange={(e) => changerChoise(e)}
                      ></input>
                      <label htmlFor="PromedioH">Promedio</label>
                      <input
                        id="MinMaxH"
                        name="height"
                        type="radio"
                        value="MinMaxH"
                        onChange={(e) => changerChoise(e)}
                      ></input>
                      <label htmlFor="MinMaxH">Min. y Max.</label>
                    </div>
                  </div>
                  {!(error.height === "Altura no puede estar vacio") ? null : (
                    <span className={a.alert}>{error.height}</span>
                  )}
                  <br />
                  <label> Promedio: </label>
                  <input
                    type="text"
                    name="height"
                    placeholder="Altura"
                    value={breeds.height}
                    disabled={
                      choiseSelected.choiseSelectedH === "PromedioH"
                        ? ""
                        : "Disabled"
                    }
                    onChange={(e) => onChangeForm(e)}
                  />
                  <br/>
                  {!error.heightErr ? null : (
                    <span className={a.alert}>{error.heightErr}</span>
                  )}
                   <br/>
                  <label> Minimo </label>
                  <input
                    type="text"
                    name="minheight"
                    placeholder="Altura Min."
                    value={height.minheight}
                    disabled={
                      choiseSelected.choiseSelectedH === "MinMaxH"
                        ? ""
                        : "Disabled"
                    }
                    onChange={(e) => onChangeForm(e)}
                  />
                  <label> Maxima </label>
                  <input
                    type="text"
                    name="maxheight"
                    placeholder="Altura Max."
                    value={height.maxheight}
                    disabled={
                      choiseSelected.choiseSelectedH === "MinMaxH"
                        ? ""
                        : "Disabled"
                    }
                    onChange={(e) => onChangeForm(e)}
                  />
                  <br />
                </div>
                {/* Peso */}
                <div className={a.petsBirthday}>
                  <div className={a.petsProperties}>
                    <div className={a.petsPropertiesA}>
                      <label htmlFor="wight">
                        Peso(cm)<span className={a.spanObligatorio}> * </span>:
                      </label>
                      <div className={a.radioContainer}>
                        <input
                          id="PromedioW"
                          name="weight"
                          type="radio"
                          value="PromedioW"
                          defaultChecked
                          onChange={(e) => changerChoise(e)}
                        ></input>
                        <label htmlFor="PromedioW">Promedio</label>
                        <input
                          id="MinMaxW"
                          name="weight"
                          type="radio"
                          value="MinMaxW"
                          onChange={(e) => changerChoise(e)}
                        ></input>
                        <label htmlFor="MinMaxW">Min. y Max.</label>
                      </div>
                    </div>
                    <br />               
                    <label> Promedio: </label>
                    <input
                      type="text"
                      name="weight"
                      placeholder="Peso"
                      value={breeds.weight}
                      disabled={
                        choiseSelected.choiseSelectedW === "PromedioW"
                          ? ""
                          : "Disabled"
                      }
                      onChange={(e) => onChangeForm(e)}
                    />
                    <br/>
                    {!error.weightErr ? null : (
                    <span className={a.alert}>{error.weightErr}</span>
                    )}
                     <br/>
                    <label> Minimo </label>
                    <input
                      type="text"
                      name="minweight"
                      placeholder="Peso Min."
                      value={weight.minweight}
                      disabled={
                        choiseSelected.choiseSelectedW === "MinMaxW"
                          ? ""
                          : "Disabled"
                      }
                      onChange={(e) => onChangeForm(e)}
                    />
                    <label> Maxima </label>
                    <input
                      type="text"
                      name="maxweight"
                      placeholder="Peso Max."
                      value={weight.maxweight}
                      disabled={
                        choiseSelected.choiseSelectedW === "MinMaxW"
                          ? ""
                          : "Disabled"
                      }
                      onChange={(e) => onChangeForm(e)}
                    />
                    <br />
                  </div>
                </div>
              </div>
             {/*  Años de vida    */} 
              <div className={a.set}>
                <div className={a.breedsName}>
                  <label htmlFor="life_span">
                    Años de vida<span className={a.spanObligatorio}> * </span>:{" "}
                  </label>
                  <input
                    type="text"
                    name="life_span"
                    id="breed"
                    placeholder="Años de vida"
                    value={breeds.life_span}
                    onChange={(e) => onChangeForm(e)}
                  />
                  <br />
                  {!error.life_spanErr ? null : (
                    <span className={a.alert}>{error.life_spanErr}</span>
                  )}
                  <br/>
                </div>
              </div>
              {/* Temperamentos */}
              <div className={a.petsTemperamets}>
                <label>Seleccionar temperamentos: </label>
                <Select
                  isMulti
                  name="temperaments"
                  value={breeds.temperaments}
                  options={estado.temperaments.map((e) => ({
                    value: e.name,
                    label: e.name,
                  }))}
                  onChange={(e) => onChangeForm(e)}
                  classNameName="basic-multi-select"
                  classNameNamePrefix="select"
                />
              </div>
            </header>
            <footer>
              <div className={a.set}>
                <button id="next" onClick={(e) => dogPost(e)}>
                  Crear Perro
                </button>
                {estado.loading ? (
                  null
                ) : (
                  <p className={a.created}>{estado.serverResponse}</p>
                )}
              </div>
            </footer>
          </div>
        </div>
      </form>
    </div>
  );
}
