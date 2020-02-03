import {CalendarBuilder} from '../../js/component/CalendarBuilder'
import {ApplicationWithStyle} from '@flexio-oss/hotballoon-test-dummies'
import {FlexDate} from '@flexio-oss/flex-types'

const applicationDev = ApplicationWithStyle.withConsoleLogger()
console.log(new FlexDate('2021-02-02'))
const calendar = new CalendarBuilder(applicationDev.application(), applicationDev.application().document().body, applicationDev.styles())
  .withMondayFirstDayOfWeek()
  .withSelectionToggle().withMultiplePeriods()
  .build()
calendar.setDate(new FlexDate('2021-02-02'))
calendar.listenDateSelected(/**{StoreState<DateList>}*/(store) => {
  console.log(store.data().dates())
})