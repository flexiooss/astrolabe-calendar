import {
  InMemoryStoreBuilder,
  PublicStoreHandler,
  TypeCheck
} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'

export class StoreSelectedMonth {
  /**
   * @private
   * @param {Store<SelectedMonth>} store
   */
  constructor(store) {
    this.__store = store
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @returns {StoreSelectedMonth}
   */
  static create(componentContext) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreSelectedMonth:build: `componentContext` should be a ComponentContext'
    )
    return new StoreSelectedMonth(
      componentContext.addStore(
        new InMemoryStoreBuilder()
          .type(globalFlexioImport.io.flexio.astrolabe_calendar.stores.SelectedMonth)
          .initialData(
            new globalFlexioImport.io.flexio.astrolabe_calendar.stores.SelectedMonthBuilder().build()
          )
          .build()
      )
    )
  }

  /**
   *
   * @returns {Store<SelectedMonth>}
   */
  store() {
    return this.__store
  }

  /**
   *
   * @returns {PublicStoreHandler<SelectedMonth>}
   */
  storePublic() {
    return new PublicStoreHandler(this.__store)
  }
}
