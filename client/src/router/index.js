import Vue from 'vue'
import VueRouter from 'vue-router'
import monitor from './monitor'
import settings from './settings'
import store from '@/store/'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/layout/'),
      children: [
        {
          path: '',
          redirect: '/inicio'
        },
        {
          path: '/inicio',
          name: 'Início',
          component: () => import('@/views/monitor/')
        },
        ...monitor,
        ...settings
      ],
      beforeEnter: (to, from, next) => localStorage.getItem('monitor-mysql:token') ? next() : next('/login')
    },
    {
      path: '/login',
      component: () => import('@/views/autenticacao'),
      children: [
        {
          path: '',
          name: 'Login',
          component: () => import('@/views/autenticacao/')
        }
      ],
      beforeEnter: (to, from, next) => localStorage.getItem('monitor-mysql:token') ? next('/') : next()
    },
    {
      path: '*',
      name: 'Página não encontrada',
      component: () => import('@/views/error/404')
    },
    {
      path: '/proibido',
      name: 'Proibido',
      component: () => import('@/views/error/403'),
      beforeEnter: (to, from, next) => localStorage.getItem('monitor-mysql:token') ? next() : next('/login')
    }
  ]
})

router.beforeEach((to, _from, next) => {
  store.commit('app/setTitulo', to.name)

  if (to.matched[0].path !== '*' && to.path !== '/login' && to.path !== '/' && to.path !== '/inicio' && to.path !== '/proibido') {
    if (localStorage.getItem('monitor-mysql:token')) {
      next()
    } else next('/proibido')
  } else next()

  next()
})

export default router
