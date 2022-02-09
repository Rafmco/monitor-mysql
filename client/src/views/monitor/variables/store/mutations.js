export default {
  systemVariablesList (state, param) {
    state.systemVariablesList = Object.values(param)
  },

  reset: () => {}
}
