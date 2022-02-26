export default {
  rolesDropdown (state, param) {
    state.rolesDropdown = param
  },
  usersList (state, param) {
    state.usersList = Object.values(param)
  },

  reset: () => {}
}
