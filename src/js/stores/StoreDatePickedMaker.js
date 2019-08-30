import {InMemoryStoreParams, PublicStoreHandler, StoreTypeParam, TypeCheck} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'
import {StoreBuilder} from '@flexio-oss/hotballoon/src/js/Store/StoreBuilder'

export class StoreDatePickedMaker {
  /**
   * @private
   * @param {Store<StoreDatePicked>} store
   * @param {PublicStoreHandler<StoreDatePicked>} storePublic
   */
  constructor(store, storePublic) {
    this.__store = store
    this.__storePublic = storePublic
  }

  /**
   * @params {ComponentContext} componentContext
   * @returns {StoreDatePickedMaker}
   */
  static create(componentContext) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreDatePickedMaker:constructor: `componentContext` should be a ComponentContext'
    )
    let store = componentContext.addStore(StoreBuilder.InMemory(
      new InMemoryStoreParams(
        new StoreTypeParam(
          globalFlexioImport.io.flexio.astrolabe_calendar.stores.StoreDatePicked,
          /**
           *
           * @param {StoreDatePicked} data
           * @return {StoreDatePicked}
           */
          (data) => {
            return data
          },
          /**
           *
           * @param {StoreDatePicked} data
           * @return {boolean}
           */
          (data) => {
            return true
          },
          /**
           *
           * @param {Object} obj
           * @return {StoreDatePicked}
           */
          (obj) => globalFlexioImport.io.flexio.astrolabe_calendar.stores.StoreDatePickedBuilder.fromObject(obj).build()
        ),
        new globalFlexioImport.io.flexio.astrolabe_calendar.stores.StoreDatePickedBuilder().build()
      )
    ))
    let storePublic = new PublicStoreHandler(store)
    return new StoreDatePickedMaker(store, storePublic)
  }

  /**
   *
   * @returns {Store<StoreDatePicked>}
   */
  store() {
    return this.__store
  }

  /**
   *
   * @returns {PublicStoreHandler<StoreDatePicked>}
   */
  storePublic() {
    return this.__storePublic
  }
}
