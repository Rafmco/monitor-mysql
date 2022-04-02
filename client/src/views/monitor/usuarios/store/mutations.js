export default {
  rolesDropdown (state, param) {
    state.rolesDropdown = param
  },
  usersList (state, param) {
    state.usersList = Object.values(param)
  },
  showGrants (state, param) {
    state.showGrants = param
  },
  showCreate (state, param) {
    state.showCreate = param
  },

  reset: () => {}
}
