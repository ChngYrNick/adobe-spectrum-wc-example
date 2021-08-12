import './provider.js';

import {Router} from '@vaadin/router';

const router = new Router(document.getElementById('outlet'));

router.setRoutes([
  {path: '/', component: 'home-page'},
  {path: '/sign-in', component: 'sign-in-page'},
]);
