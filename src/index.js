import './provider.js';

import {Router} from '@vaadin/router';

const router = new Router(document.getElementById('outlet'));

router.setRoutes([
  {
    path: '/',
    animate: true,
    children: [
      {path: '', component: 'home-page'},
      {path: '/sign-in', component: 'sign-in-page'},
      {path: '/upload', component: 'upload-page'},
      {path: '/user', component: 'user-page'},
    ],
  },
]);
