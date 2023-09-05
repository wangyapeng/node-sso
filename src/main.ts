// import { createApp } from "vue";
// import "./style.css";
// import App from "./App.vue";
// createApp(App).mount("#app");

import { createSSRApp } from 'vue';
import './style.scss';
import './theme.css'
import bootstrap from 'bootstrap'
import App from './App.vue';
import MakeitCaptcha from 'makeit-captcha'


export const createApp = () => {
  const app = createSSRApp(App);
  app.use(MakeitCaptcha)
  return { app };
};
