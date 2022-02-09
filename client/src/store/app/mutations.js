// import day from '@/plugins/dayjs'

export default {
  reset: () => {},

  login (state, param) {
    state.login = param
  },
  menusUsuario (state, param) {
    state.menusUsuario = param
  },
  nome (state, param) {
    state.nome = param
  },
  setNotificacao (state, { ativo, cor, icone, mensagem, tempo }) {
    state.notificacao = {
      ativo,
      cor,
      icone,
      mensagem,
      tempo
    }
  },
  setTitulo (state, titulo) {
    state.titulo = `${process.env.VUE_APP_TITLE} ${titulo ? '- ' + titulo : ''}`
  }
}
