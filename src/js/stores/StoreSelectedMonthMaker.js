import {InMemoryStoreParams, PublicStoreHandler, StoreTypeParam, TypeCheck} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'
import {StoreBuilder} from '@flexio-oss/hotballoon/src/js/Store/StoreBuilder'

export class StoreSelectedMonthMaker {
  /**
   * @private
   * @param {Store<StoreSelectedMonth>} store
   * @param {PublicStoreHandler<StoreSelectedMonth>} storePublic
   */
  constructor(store, storePublic) {
    this.__store = store
    this.__storePublic = storePublic
  }

  /**
   *
   * @params {ComponentContext} componentContext
   * @returns {StoreSelectedMonthMaker}
   */
  static create(componentContext) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreSelectedMonthMaker:constructor: `componentContext` should be a ComponentContext'
    )
    let store = componentContext.addStore(StoreBuilder.InMemory(
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
    let storePublic = new PublicStoreHandler(store)
    return new StoreSelectedMonthMaker(store, storePublic)
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
