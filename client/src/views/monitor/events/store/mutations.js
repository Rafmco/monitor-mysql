import day from '@/plugins/dayjs'

export default {
  eventsList (state, param) {
    param.forEach(element => {
      element.starts = day(element.starts).format('DD/MM/YYYY HH:mm:ss')
      element.created = day(element.created).format('DD/MM/YYYY HH:mm:ss')
      element.last_altered = day(element.last_altered).format('DD/MM/YYYY HH:mm:ss')
      element.last_executed = day(element.last_executed).format('DD/MM/YYYY HH:mm:ss')
    })

    state.eventsList = param
  },

  reset: () => {}
}
