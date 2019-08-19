import {InMemoryStoreParams, PublicStoreHandler, StoreTypeParam, TypeCheck} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'
import {StoreBuilder} from '@flexio-oss/hotballoon/src/js/Store/StoreBuilder'

export class StoreDatePickedUtils {
  constructor() {
    this.__store = null
    this.__storePublic = null
  }

  /**
   * @params {ComponentContext} componentContext
   * @returns {StoreDatePickedUtils}
   */
  build(componentContext) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreDatePickedUtils:constructor: `componentContext` should be a ComponentContext'
    )
    this.__store = componentContext.addStore(StoreBuilder.InMemory(
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
    this.__storePublic = new PublicStoreHandler(this.__store)
    return this
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
