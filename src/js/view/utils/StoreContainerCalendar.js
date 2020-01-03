import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'

export class StoreContainerCalendar {
  constructor(storeSelectedMonth) {
    assertType(storeSelectedMonth.isTypeOf(globalFlexioImport.io.flexio.astrolabe_calendar.stores.SelectedMonth),
      'StoreContainerCalendar:constructor: `storeSelectedMonth` should be a Store of StoreSelectedMonth'
    )
    this.__storeSelectedMonth = TypeCheck.assertStoreBase(storeSelectedMonth)
  }

  /**
   *
   * @return {PublicStoreHandler<SelectedMonth, SelectedMonthBuilder>}
   */
  publicStoreSelectedMonth() {
    return this.__storeSelectedMonth
  }
}
