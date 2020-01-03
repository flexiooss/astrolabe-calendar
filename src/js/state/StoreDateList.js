import {InMemoryStoreBuilder, PublicStoreHandler, TypeCheck} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'

export class StoreDateList {
  /**
   * @private
   * @param {Store<DateList>} store
   */
  constructor(store) {
    this.__store = store
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @returns {StoreDateList}
   */
  static create(componentContext) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreDateList:build: `componentContext` should be a ComponentContext'
    )
    return new StoreDateList(
      componentContext.addStore(
        new InMemoryStoreBuilder()
          .type(globalFlexioImport.io.flexio.astrolabe_calendar.stores.DateList)
          .initialData(
            new globalFlexioImport.io.flexio.astrolabe_calendar.stores.DateListBuilder().build()
          )
          .build()
      )
    )
  }

  /**
   *
   * @returns {Store<DateList>}
   */
  store() {
    return this.__store
  }

  /**
   *
   * @returns {PublicStoreHandler<DateList>}
   */
  storePublic() {
    return new PublicStoreHandler(this.__store)
  }
}
