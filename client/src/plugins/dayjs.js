import Vue from 'vue'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import toObject from 'dayjs/plugin/toObject'

dayjs.extend(customParseFormat)
dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(toObject)

Vue.prototype.$day = dayjs

export default dayjs
