import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'
import { ActionDispatcherBuilder, TypeCheck } from '@flexio-oss/hotballoon'

export class ActionDateChangedPublic {
  /**
   * @private
   * @param {ActionDispatcher<PickedDate, PickedDateBuilder>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionDateChangedPublic}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionDateChangedPublic:create: `dispatcher` should be a Dispatcher'
    )
    return new ActionDateChangedPublic(
      new ActionDispatcherBuilder()
        .type(globalFlexioImport.io.flexio.astrolabe_calendar.actions.PickedDate)
        .dispatcher(dispatcher)
        .build()
    )
  }

  /**
   *
   * @returns {ActionDispatcher<PickedDate, PickedDateBuilder>}
   */
  action() {
    return this.__action
  }
}
