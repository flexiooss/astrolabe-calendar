import {CalendarBuilder} from '../../js/component/CalendarBuilder'
import {ApplicationWithStyle} from '@flexio-oss/hotballoon-test-dummies'

const applicationDev = ApplicationWithStyle.withConsoleLogger()

const calendar = new CalendarBuilder(applicationDev.application(), applicationDev.application().document().body, applicationDev.styles())
  .withMondayFirstDayOfWeek()
  .withSelectionToggle().withLimit(2)
  .build()
calendar.listenDateSelected(/**{StoreState<DateList>}*/(store) => {
  console.log(store.data().dates())
})