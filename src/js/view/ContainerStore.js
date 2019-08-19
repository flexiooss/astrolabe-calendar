import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'

const StoreDatePicked = globalFlexioImport.io.flexio.astrolabe_calendar.stores.StoreDatePicked
const StoreSelectedMonth = globalFlexioImport.io.flexio.astrolabe_calendar.stores.StoreSelectedMonth

export class ContainerStore {
  constructor(storeDatePicked, storeSelectedMonth) {
    assertType(storeDatePicked.isTypeOf(StoreDatePicked),
      'ContainerStore:constructor: `storeDatePicked` should be a Store of StoreDatePicked'
    )
    assertType(storeSelectedMonth.isTypeOf(StoreSelectedMonth),
      'ContainerStore:constructor: `storeSelectedMonth` should be a Store of StoreSelectedMonth'
    )

    this.__storeDatePicked = TypeCheck.assertStoreBase(storeDatePicked)
    this.__storeSelectedMonth = TypeCheck.assertStoreBase(storeSelectedMonth)
  }

  /**
   *
   * @return {PublicStoreHandler<StoreDatePicked>}
   */
  get publicStoreDatePicked() {
    return this.__storeDatePicked
  }

  /**
   *
   * @return {PublicStoreHandler<StoreSelectedMonth>}
   */
  get publicStoreSelectedMonth() {
    return this.__storeSelectedMonth
  }
}
