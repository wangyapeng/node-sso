import { createApp } from './main';
import { createRouter } from './router';
import createStore from './store';

const router = createRouter('client');
const pinia = createStore();

const { app } = createApp();

app.use(router);
app.use(pinia);


// 初始化 pinia
// 注意：__INITIAL_STATE__需要在 src/types/shims-global.d.ts中定义
// 开发环境这个不处理也不重要
//@ts-ignore
if (window.__INITIAL_STATE__) {
  try {
    //@ts-ignore
    pinia.state.value = JSON.parse(window.__INITIAL_STATE__ === '<!--pinia-state-->' ? {} : window.__INITIAL_STATE__);
  } catch (error) {
    console.error(error);
  }
}

router.isReady().then(() => {
  app.mount('#dudu-root', true);
});
