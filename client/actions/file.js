import axios from 'axios';
import qs from 'qs';

import { FILE__UPLOAD } from 'dictionary/action';
import { baseUrl, requestHeaders } from 'dictionary/network';
import { createAction } from 'util/action';

export function uploadFile(fileData) {
  return createAction({
    type: FILE__UPLOAD,
    action: () => {
      return axios.post(`${baseUrl}/Upload`, qs.stringify(fileData), requestHeaders);
    },
  });
}
