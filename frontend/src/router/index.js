import Vue from 'vue'
import VueRouter from 'vue-router'
import jwt_decode from "jwt-decode";

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/dashboard/Index.vue'),
    children: [
      {
        path: '/',
        name: 'Dashboard - Home',
        meta: {
          role: 'Admin'
        },
        component: () => import('../views/dashboard/Home.vue'),

      },
      {
        path: 'products',
        name: 'Dashboard - Products',

        meta: {
          role: 'Admin'
        },
        component: () => import('../views/dashboard/Products.vue'),
      }
    ]
  },
  {
    path: '/',
    component: () => import('../views/Index.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      },
      {
        path: '/search/:search',
        name: 'Search',
        component: () => import('@/views/Search.vue')
      },
      {
        path: '/product/:id',
        name: 'Product',
        component: () => import('@/views/Product.vue')
      },
      {
        path: '/sing-in',
        name: 'SingIn',
        component: () => import('@/views/SingIn.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  document.title = to.name;
  try {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      const token = localStorage.getItem('token');

      if (!token) {
        next({
          path: '/sing-in',
          query: { redirect: to.fullPath }
        });
      } else {
        const user = jwt_decode(token);
        if (user.role !== to.meta.role) {
          next({
            path: '/sing-in',
            query: { redirect: to.fullPath }
          });
        } else {
          next();
        }
      }
    }
    next()
  } catch (error) {
    console.log(error);
    next({
      path: '/sing-in',
      query: { redirect: to.fullPath }
    });
  }

})

export default router
