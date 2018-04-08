import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Home from '@/components/Home';
import Admin from '@/components/Admin';
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
      component: Admin
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
  mode: "history"
});
