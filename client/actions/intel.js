import axios from 'axios';
import qs from 'qs';

import { INTEL_EEI__ADD, INTEL_REQUEST__ADD, INTEL_EEI__FETCH, INTEL_REQUEST__FETCH, INTEL_REQUEST__FETCH_ONE, INTEL_REQUEST__UPDATE, INTEL_REQUEST__DELETE } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function addIntelEei(intelEei) {
  return createAction({
    type: INTEL_EEI__ADD,
    action: () => axios.post(`${baseUrl}/IntelReqEEI`, qs.stringify(intelEei), {headers:requestHeaders}),
  });
}

export function addIntelRequest(intelRequest) {
  return createAction({
    type: INTEL_REQUEST__ADD,
    action: () => axios.post(`${baseUrl}/IntelRequest/PostIntelRequest`, qs.stringify(intelRequest), {headers:requestHeaders}),
  });
}

export function updateIntelRequest(id,intelRequest) {
  return createAction({
    type: INTEL_REQUEST__UPDATE,
    action: () => axios.put(`${baseUrl}/IntelRequest/PutIntelRequest/${id}`, qs.stringify(intelRequest), {headers:requestHeaders}),
  });
}

export function fetchIntelRequestById(id) {
  return createAction({
    type: INTEL_REQUEST__FETCH_ONE,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetIntelRequest/${id}`, {headers:requestHeaders}),
  });
}

export function fetchIntelRequests() {
  return createAction({
    type: INTEL_REQUEST__FETCH,
    action: () => axios.get(`${baseUrl}/IntelRequest/GetIntelRequestData`, {headers:requestHeaders}),
  });
}

export function fetchIntelEEI() {
  return createAction({
    type: INTEL_EEI__FETCH,
    action: () => axios.get(`${baseUrl}/IntelReqEEI`, {headers:requestHeaders}),
  });
}

export function deleteIntelRequestById(id) {
  return createAction({
    type: INTEL_REQUEST__DELETE,
    action: () => axios.delete(`${baseUrl}/IntelRequest/DeleteIntelRequest/${id}`, {headers:requestHeaders}),
  });
}


