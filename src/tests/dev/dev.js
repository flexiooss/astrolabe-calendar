import {CalendarBuilder} from '../../js/component/CalendarBuilder'
import {DaysEnum} from '@flexio-oss/astrolabe/src/js/types/DaysEnum'
import {ApplicationWithStyle} from '@flexio-oss/hotballoon-test-dummies'

const applicationDev = ApplicationWithStyle.withConsoleLogger()

const calendar = new CalendarBuilder()
  .application(applicationDev.application())
  .firstDay(DaysEnum.MON)
  .parentNode(applicationDev.application().document().body)
  .styles(applicationDev.styles())
  .build()
