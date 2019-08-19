import {TestCase} from 'code-altimeter-js'
import {DateExtended} from '@flexio-oss/extended-flex-types'
import {StoreDatePicked} from '../../generated/io/flexio/astrolabe_calendar/stores/StoreDatePicked'
import '../../import'

const assert = require('assert')

export class TestAstrolabeCalendar extends TestCase {

  testDeepFreeze() {
    let store = new StoreDatePicked(new DateExtended())
    let datePicked = new DateExtended(2012, 2)
    store.withDate(datePicked)
    datePicked.setFullYear(2019, 7, 20)
    console.log(store)
  }
}

runTest(TestAstrolabeCalendar)
