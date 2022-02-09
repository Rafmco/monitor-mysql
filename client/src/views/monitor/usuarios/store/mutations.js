export default {
  usersList (state, param) {
    state.usersList = Object.values(param)
  },

  reset: () => {}
}
