import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'

export class CalendarStoreManager {
  constructor(storeDatePicked, storeSelectedMonth) {
    assertType(storeDatePicked.isTypeOf(globalFlexioImport.io.flexio.astrolabe_calendar.stores.StoreDatePicked),
      'CalendarStoreManager:constructor: `storeDatePicked` should be a Store of StoreDatePicked'
    )
    this.__storeDatePicked = TypeCheck.assertStoreBase(storeDatePicked)

    assertType(storeSelectedMonth.isTypeOf(globalFlexioImport.io.flexio.astrolabe_calendar.stores.StoreSelectedMonth),
      'CalendarStoreManager:constructor: `storeSelectedMonth` should be a Store of StoreSelectedMonth'
    )
    this.__storeSelectedMonth = TypeCheck.assertStoreBase(storeSelectedMonth)
  }

  /**
   *
   * @return {PublicStoreHandler<StoreDatePicked>}
   */
  publicStoreDatePicked() {
    return this.__storeDatePicked
  }

  /**
   *
   * @return {PublicStoreHandler<StoreSelectedMonth>}
   */
  publicStoreSelectedMonth() {
    return this.__storeSelectedMonth
  }
}
