import {InMemoryStoreBuilder, PublicStoreHandler, TypeCheck} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'

export class StoreDatePicked {
  /**
   * @private
   * @param {Store<DatePicked>} store
   */
  constructor(store) {
    this.__store = store
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @returns {StoreDatePicked}
   */
  static create(componentContext) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreDatePicked:build: `componentContext` should be a ComponentContext'
    )
    return new StoreDatePicked(
      componentContext.addStore(
        new InMemoryStoreBuilder()
          .type(globalFlexioImport.io.flexio.astrolabe_calendar.stores.DatePicked)
          .initialData(
            new globalFlexioImport.io.flexio.astrolabe_calendar.stores.DatePickedBuilder().build()
          )
          .build()
      )
    )
  }

  /**
   *
   * @returns {Store<DatePicked>}
   */
  store() {
    return this.__store
  }

  /**
   *
   * @returns {PublicStoreHandler<DatePicked>}
   */
  storePublic() {
    return new PublicStoreHandler(this.__store)
  }
}
