import { createApp } from 'vue';

import router from './router.js';
import store from './store/index.js';
import App from './App.vue';
import './style/index.css';

const app = createApp(App);

app.config.devtools = true;

app.use(router);
app.use(store);

// Global components
import ErrorAlert from "./components/global/ErrorAlert";
import Modal from "./components/global/Modal";
import StyledInput from "./components/global/StyledInput";
import Button from "./components/global/Button";
import Layout from "./components/global/Layout";
app.component('g-error-alert', ErrorAlert);
app.component('g-modal', Modal);
app.component('g-input', StyledInput);
app.component('g-button', Button);
app.component('g-layout', Layout);

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faTimes);
library.add(faPen);
app.component('font-awesome-icon', FontAwesomeIcon);


app.mount('#app');
