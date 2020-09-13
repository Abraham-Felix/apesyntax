import firebase from '../plugins/firebase'
import Vue from 'vue'
import VueRouter from 'vue-router'

import Contact from '../views/Contact.vue'
import Tutorials from '../views/Tutorials.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/tutorials',
    name: 'Tutorials',
    component: Tutorials,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

    router.beforeEach((to, from, next) =>  {

      const currentUser = firebase.auth().currentUser;
      const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

      if (requiresAuth && !currentUser) next('login');
      else if (!requiresAuth && currentUser) next('profile')
      next(firebase.auth().onAuthStateChanged(currentUser => {
          currentUser}));
    });

export default router;
