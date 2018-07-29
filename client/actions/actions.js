  /**
 * this is actionTaken actions creator functions.
 */
import axios from 'axios';
import { baseUrl, requestHeaders } from 'dictionary/network';
import qs  from 'qs';
import namor from "namor";


import {

        GET_TRANSLATIONS_FULFILLED,

        REQUEST_ADD_PERSONNEL,
        RECEIVE_ADD_PERSONNEL,

        REQUEST_PERSONNELS,
        RECEIVE_PERSONNELS,

        REQUEST_ADD_PLATFORM,
        RECEIVE_ADD_PLATFORM,

        REQUEST_PLATFORMS,
        RECEIVE_PLATFORMS,

        REQUEST_ADD_PAYLOAD,
        RECEIVE_ADD_PAYLOAD,

        REQUEST_PAYLOAD,
        RECEIVE_PAYLOAD,

        REQUEST_PAYLOAD_TYPES,
        RECEIVE_PAYLOAD_TYPES,

        REQUEST_PAYLOAD_DATA,
        RECEIVE_PAYLOAD_DATA,

        REQUEST_UPLOAD,
        RECEIVE_UPLOAD,

        REQUEST_ADD_MUNITION,
        RECEIVE_ADD_MUNITION,

        REQUEST_MUNITION,
        RECEIVE_MUNITION,

        REQUEST_ADD_LOCATION,
        RECEIVE_ADD_LOCATION,

        REQUEST_LOCATIONS,
        RECEIVE_LOCATIONS,

        REQUEST_LOCATION_TYPES,
        RECEIVE_LOCATION_TYPES,

        REQUEST_LOCATION_DATA,
        RECEIVE_LOCATION_DATA,

        REQUEST_ADD_EEI,
        RECEIVE_ADD_EEI,

        REQUEST_ADD_INTELREQUEST,
        RECEIVE_ADD_INTELREQUEST,

        REQUEST_COCOM,
        RECEIVE_COCOM,

} from '../constants/actionTypes';

export let getTranslations = (lang) => {
  return (dispatch) => {
    let response = require(`../translates/${lang}.json`)

    dispatch({ type: GET_TRANSLATIONS_FULFILLED, payload: response });
  };
};

// Locations

function requestAddLocation() {
  return {
    type: REQUEST_ADD_LOCATION
  }
}

function receiveAddLocation() {
  return {
    type: RECEIVE_ADD_LOCATION
  }
}


export let addLocation = (location) => {

  const url = baseUrl + 'Locations';

  console.log('----here locations post api-----------');
  console.log(JSON.stringify(location));


  return (dispatch) => {
    dispatch(requestAddLocation());
    return axios.post(url, qs.stringify(location), requestHeaders)
    .then(
      (response) => {
        dispatch(receiveAddLocation(response));
        console.log(response);
        alert("Add Success!");
          return response;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}


function requestLocations() {
  return {
    type: REQUEST_LOCATIONS
  }
}

function receiveLocations(data) {
  return {
    type: RECEIVE_LOCATIONS,
    location_list: data
  }
}


export function getLocations() {

  const url = baseUrl + 'Locations/GetLocations';

  return (dispatch) => {
    dispatch(requestLocations());
    return axios.get(url, requestHeaders)
    .then(
      (response) => {
        dispatch(receiveLocations(response.data));
        return response.data;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}

function requestLocationTypes() {
  return {
    type: REQUEST_LOCATION_TYPE
  }
}

function receiveLocationTypes(data) {
  return {
    type: RECEIVE_LOCATION_DATA,
    location_types: data
  }
}


export function getLocationsTypes() {

  const url = baseUrl + 'LocationCategory';

  return (dispatch) => {
    dispatch(requestLocationTypes());
    return axios.get(url, requestHeaders)
    .then(
      (response) => {
        dispatch(receiveLocationTypes(response.data));
        return response.data;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}


function requestLocationData() {
  return {
    type: REQUEST_LOCATION_DATA
  }
}

function receiveLocationData(data) {
  return {
    type: RECEIVE_LOCATION_DATA,
    location_data: data
  }
}


export function fetchLocationData() {

  const url = baseUrl + 'Locations/GetLocationsData';

  return (dispatch) => {
    dispatch(requestLocationData());
    return axios.get(url, requestHeaders)
    .then(
      (response) => {
        dispatch(receiveLocationData(response.data));
        console.log("Location Data is");
        console.log(response.data);
        return response.data;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}


const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    type: namor.generate({ words: 1, numbers: 0 }),
    name: namor.generate({ words: 1, numbers: 0 }),
    serial: Math.floor(Math.random() * 30),
    cocom: namor.generate({ words: 1, numbers: 0 }),
    unit: Math.floor(Math.random() * 100),
    location: Math.floor(Math.random() * 100),
    view: 'view',
    date:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33 ? "complicated" : "single"
  };
};

export function makeData(len = 100) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
}


// intel Request EEI
function requestAddEEI() {
  return {
    type: REQUEST_ADD_EEI
  }
}

function receiveAddEEI() {
  return {
    type: RECEIVE_ADD_EEI
  }
}


export let addIntelEEI = (intelEEI) => {

  const url = baseUrl + 'IntelReqEEI';

  console.log('----here locations post api-----------');
  console.log(JSON.stringify(intelEEI));


  return (dispatch) => {
    dispatch(requestAddEEI());
    return axios.post(url, qs.stringify(intelEEI), requestHeaders)
    .then(
      (response) => {
        dispatch(receiveAddEEI(response));
        console.log(response);
        alert("Add Success!");
          return response;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}


// intel Request
function requestAddIntelReq() {
  return {
    type: REQUEST_ADD_INTELREQUEST
  }
}

function receiveAddIntelReq() {
  return {
    type: RECEIVE_ADD_INTELREQUEST
  }
}


export let addIntelReq = (intelReq) => {

  const url = baseUrl + 'IntelRequest';

  console.log('----here locations post api-----------');
  console.log(JSON.stringify(intelReq));


  return (dispatch) => {
    dispatch(requestAddIntelReq());
    return axios.post(url, qs.stringify(intelReq), requestHeaders)
    .then(
      (response) => {
        dispatch(receiveAddIntelReq(response));
        console.log(response);
        alert("Add Success!");
          return response;
      }
    )
    .catch(error => {
          alert(error);
      });
  }
}

//cocom reqeust

function requestCocoms() {
  return {
    type: REQUEST_COCOM
  }
}

function receiveCocoms(data) {
  return {
    type: RECEIVE_COCOM,
    cocom_list: data
  }
}


export function getCocoms() {

  const url = baseUrl + 'COCOM';

  return (dispatch) => {
    dispatch(requestCocoms());
    return axios.get(url, requestHeaders)
    .then(
      (response) => {
        dispatch(receiveCocoms(response.data));
        return response.data;
      }
    )
    .catch(error => {
        alert(error);
    });
  }
}
