import axios from 'axios';

export default {
  get(url, query, options) {
    return axios.get(url, { ...options, query });
  },

  post(url, data, options) {
    return axios.post(url, data, options);
  },

  put(url, data, options) {
    return axios.put(url, data, options);
  },
};
