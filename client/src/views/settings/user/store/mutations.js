export default {
  profileDropdown (state, param) {
    state.profileDropdown = param
  },
  userList (state, param) {
    state.userList = param
  },
  setLoading (state, param) {
    state.loading = param
  },
  reset: () => {}
}
