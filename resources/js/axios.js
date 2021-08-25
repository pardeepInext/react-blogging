import axios from 'axios';

const asset = document.querySelector('meta[name="asset"]').content;
const csrf = document.querySelector('meta[name="csrf"]').content;

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `${asset}\api`;
axios.defaults.headers.common['Accept'] = "application/json";
axios.defaults.headers.common["X-CSRF-Token"] = csrf;

export default axios;