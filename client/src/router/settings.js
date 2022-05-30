export default [
  {
    path: '/settings/server',
    name: 'Servidores',
    component: () => import('@/views/settings/server')
  },
  {
    path: '/settings/menu',
    name: 'Menus',
    component: () => import('@/views/settings/menu')
  },
  {
    path: '/settings/profile',
    name: 'Perfis',
    component: () => import('@/views/settings/profile')
  },
  {
    path: '/settings/user',
    name: 'Usuários',
    component: () => import('@/views/settings/user')
  }
]
