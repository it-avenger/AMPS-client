// Dev url
export const baseUrl = 'http://18.222.48.211:8081/api';
export const baseUrl2 = 'http://18.222.48.211:8082/api';

import initialState from 'store/initialState';
// Staging URL
// export const baseUrl = 'http://ec2-18-220-128-32.us-east-2.compute.amazonaws.com:8082/api';

let token = sessionStorage.getItem('jwtToken');

export const requestHeaders = {
  'Accept': 'application/json,text/plain',
  'Content-Type': 'application/json',
  'Authorization':`Bearer ${token}`,
  'Cache-Control' : 'no-cache'
};

export const formDataRequestHeader = {
  'Accept': 'application/json,text/plain',
  'Content-Type': '',
  //'Content-Type': 'multipart/form-data',
  'Authorization':`Bearer ${token}`,
  'Cache-Control' : 'no-cache'
  // 'Content-Type': 'multipart/form-data',
};

