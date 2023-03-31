
import {CHANGE_ORDER, LOAD_DOGS, ADD_DOG, BREED_SEARCHER, LOADING ,ORDER_BREEDS_ASC, ORDER_BREEDS_DES, 
        SEARCH_DOGID, ORDER_WEIGHT_DES, ORDER_WEIGHT_ASC, LOAD_TEMPERAMENTS, TEMPERAMENTS_SEARCHER} from "../actions/index"

const initialState = {
    breeds: [],
    loading : false,
    dogId: {},
    temperaments: [],
    searcherSelected: 0,
    orderSelected: "",
    serverResponse : ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_ORDER:
        return {
          ...state,
          orderSelected: action.payload
        }
      case ADD_DOG:
        return {
          ...state,
          loading: false,
          serverResponse: action.payload
          }
      case LOAD_DOGS:
        return {
          ...state,
          loading: false,
          breeds: action.payload
          }
        case TEMPERAMENTS_SEARCHER:
          return {
            ...state,
            loading: false,
            breeds: action.payload
          }
        case LOAD_TEMPERAMENTS:
          return {
            ...state,
            loading: false,
            temperaments: action.payload
          }
        case BREED_SEARCHER:
          return {
            ...state,
            loading: false,
            breeds: action.payload
          }
        case LOADING: 
          return {
            ...state,
            loading: true,
          }
        case ORDER_BREEDS_ASC:
          return {
            ...state,
            breeds: state.breeds.sort(function(a, b){
              if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
              if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
              console.log(state.breeds);
               return 0;
          })
          }
        case ORDER_BREEDS_DES:
          return {
            ...state,
            breeds: state.breeds.sort(function(a, b){
              if(a.name.toLowerCase() < b.name.toLowerCase()) { return 1; }
              if(a.name.toLowerCase() > b.name.toLowerCase()) { return -1; }
              return 0;
          })
          } 
        case SEARCH_DOGID:
          return {
            ...state,
            loading: false,
            dogId: action.payload
          } 
        case ORDER_WEIGHT_DES: 
          return {
            ...state,
            breeds: state.breeds.sort(function (a, b){
              let numA = a.weight.split(" - ")
              let numB = b.weight.split(" - ")
              let promedioA = (parseInt(numA[0]) + parseInt(numA[1])) / 2
              let promedioB = (parseInt(numB[0]) + parseInt(numB[1])) / 2
               if (numA.length === 1) {
                return promedioB - numA[0]
              } else if(numB.length === 1) {
                return numB[0] - promedioA
              } 
              return promedioB - promedioA;
          })
        }
        case ORDER_WEIGHT_ASC: 
          return {
            ...state,
            breeds: state.breeds.sort(function (a, b){
              let numA = a.weight.split(" - ")
              let numB = b.weight.split(" - ")
              let promedioA = (parseInt(numA[0]) + parseInt(numA[1])) / 2
              let promedioB = (parseInt(numB[0]) + parseInt(numB[1])) / 2
               if (numA.length === 1) {
                return numA[0] - promedioB
              } else if(numB.length === 1) {
                return promedioA - numB[0]
              } 
              return promedioA - promedioB;
          })
        }
      default:
        return state;
    }
  };


export default reducer;