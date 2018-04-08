import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Home from '@/components/Home';
import { requireAuth } from '../../utils/auth';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      beforeEnter: requireAuth,
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
  //mode: "history"
});
