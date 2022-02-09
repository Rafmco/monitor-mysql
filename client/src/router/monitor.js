export default [
  {
    path: '/monitor/dashboard',
    name: 'Dashboard de Monitoramento',
    component: () => import('@/views/monitor/dashboard')
  },
  {
    path: '/monitor/usuarios',
    name: 'Listagem de Usuários do Banco',
    component: () => import('@/views/monitor/usuarios')
  },
  {
    path: '/monitor/variables',
    name: 'Status/System Variables',
    component: () => import('@/views/monitor/variables')
  },
  {
    path: '/monitor/events',
    name: 'Listagem de Eventos do Banco',
    component: () => import('@/views/monitor/events')
  }
]
