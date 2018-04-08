import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Home from '@/components/Home';
import Admin from '@/components/Admin';
import Lawyer from '@/components/Lawyer';
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
      path: '/lawyer',
      name: 'Lawyer',
      component: Lawyer
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
  mode: "history"
});
