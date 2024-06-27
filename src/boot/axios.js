import { boot, store } from 'quasar/wrappers';
import { createPinia } from 'pinia';
import { Loading, Notify, SessionStorage, Dialog } from 'quasar';
import axios from 'axios';

export default boot(({ app, router }) => {
  app.use(createPinia());
});

export { axios };
