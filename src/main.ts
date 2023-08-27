// import { createApp } from "vue";
// import "./style.css";
// import App from "./App.vue";
// createApp(App).mount("#app");

import { createSSRApp } from 'vue';
import './style.scss';
import './theme.css'
import bootstrap from 'bootstrap'
import App from './App.vue';


export const createApp = () => {
  const app = createSSRApp(App);

  return { app };
};
