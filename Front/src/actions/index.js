import axios from "axios"
export const ADD_DOG = "ADD_DOG"
export const BREED_SEARCHER = "BREED_SEARCHER"
export const LOADING = "loading"
export const ORDER_BREEDS_ASC = "ORDER_BREEDS_ASC"
export const ORDER_BREEDS_DES = "ORDER_BREEDS_DES"
export const SEARCH_DOGID = "SEARCH_DOGID"
export const ORDER_WEIGHT_DES = "ORDER_WEIGHT_DES"
export const ORDER_WEIGHT_ASC = "ORDER_WEIGHT_ASC"
export const LOAD_TEMPERAMENTS = "LOAD_TEMPERAMENTS"
export const TEMPERAMENTS_SEARCHER = "TEMPERAMENTS_SEARCHER"
export const LOAD_DOGS = "LOAD_DOGS"
export const CHANGE_ORDER = "CHANGE_ORDER"
export const DATA_HOME = "DATA_HOME" 

export function changeOrder(order) {
    return {
        type: CHANGE_ORDER,
        payload: order
    }
}

export function searchDoId(id) {
    return function (dispatch) {
        dispatch(loading())
        axios.get(`http://localhost:3001/dogs/${id}`)
            .then(r => r.data)
            .then(data => {
                dispatch({
                type: SEARCH_DOGID,
                payload : data
            })})
            .catch(e => console.log(e))
    }
}

export function temperamentsSearcher(array) {
    return function (dispatch) {
        dispatch(loading())
        const arrValues = array.map(e => e.value)
        axios.get(`http://localhost:3001/dogs?array=${arrValues}`)
            .then(r => r.data)
            .then(data => {
                dispatch({
                type: TEMPERAMENTS_SEARCHER,
                payload : data
            })})
            .catch(e => {
                dispatch({
                type: TEMPERAMENTS_SEARCHER,
                payload : e
            })})
    }
}

export function loadTemperaments() {
    return function (dispatch) {
        dispatch(loading())
        axios.get(`http://localhost:3001/temperaments`)
            .then(r => r.data)
            .then(data => {
                dispatch({
                type: LOAD_TEMPERAMENTS,
                payload : data
            })})
            .catch(e => console.log(e))
    }
}

export function loading() {
    return {
        type: LOADING,
    }
}

export function breedSearcher(breed) {
    return function (dispatch) {
        dispatch(loading())
        axios.get(`http://localhost:3001/dogs?name=${breed}`)
            .then(r => r.data)
            .then(data => {
                dispatch({
                type: BREED_SEARCHER,
                payload : data
            })})
            .catch(e => {
                dispatch({
                type: BREED_SEARCHER,
                payload : e
            })})
    }
}

export function orderdes() {
    return {
        type: ORDER_BREEDS_DES
    }
}

export function orderasc() {
    return {
        type: ORDER_BREEDS_ASC
    }
}

export function loadDogs(payload) {
    return function (dispatch) {
        dispatch(loading())
        axios.get(`http://localhost:3001/dogs`, payload)
            .then(r => r.data)
            .then((data) => {
                dispatch({
                type: LOAD_DOGS,
                payload : data
            })})
            .catch(e => {
                dispatch({
                type: LOAD_DOGS,
                payload : e
            })})
    }
}

export function orderdesWeight() {
    return {
        type: ORDER_WEIGHT_DES
    }
}

export function orderascWeight() {
    return {
        type: ORDER_WEIGHT_ASC
    }
}

export function addDog(payload) {
    return function (dispatch) {
        dispatch(loading())
        axios.post(`http://localhost:3001/dogs`, payload)
            .then(r => r.data)
            .then((data) => {
                dispatch({
                type: ADD_DOG,
                payload : data
            })})
            .catch(e => {
                dispatch({
                type: ADD_DOG,
                payload : e
            })})
    }
}