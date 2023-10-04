import 'dayjs/locale/pt-br'
import DayJS from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

DayJS.locale('pt-br')
DayJS.extend(relativeTime)

export const dayjs = DayJS
