import {InMemoryStoreParams, PublicStoreHandler, StoreTypeParam, TypeCheck} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'
import {StoreBuilder} from '@flexio-oss/hotballoon/src/js/Store/StoreBuilder'

export class StoreSelectedMonthUtils {
  constructor() {
    this.__store = null
    this.__storePublic = null
  }

  /**
   *
   * @params {ComponentContext} componentContext
   * @returns {StoreSelectedMonthUtils}
   */
  build(componentContext) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreSelectedMonthUtils:constructor: `componentContext` should be a ComponentContext'
    )
    this.__store = componentContext.addStore(StoreBuilder.InMemory(
      new InMemoryStoreParams(
        new StoreTypeParam(
          globalFlexioImport.io.flexio.astrolabe_calendar.stores.StoreSelectedMonth,
          /**
           *
           * @param {StoreSelectedMonth} data
           * @return {StoreSelectedMonth}
           */
          (data) => {
            return data
          },
          /**
           *
           * @param {StoreSelectedMonth} data
           * @return {boolean}
           */
          (data) => {
            return true
          },
          /**
           *
           * @param {Object} obj
           * @return {StoreSelectedMonth}
           */
          (obj) => globalFlexioImport.io.flexio.astrolabe_calendar.stores.StoreSelectedMonthBuilder.fromObject(obj).build()
        ),
        new globalFlexioImport.io.flexio.astrolabe_calendar.stores.StoreSelectedMonthBuilder().build()
      )
    ))
    this.__storePublic = new PublicStoreHandler(this.__store)
    return this
  }

  /**
   *
   * @returns {Store<StoreSelectedMonth>}
   */
  store() {
    return this.__store
  }

  /**
   *
   * @returns {PublicStoreHandler<StoreSelectedMonth>}
   */
  storePublic() {
    return this.__storePublic
  }
}
