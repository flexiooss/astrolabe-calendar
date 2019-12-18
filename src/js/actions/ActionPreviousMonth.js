import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType, isNull} from '@flexio-oss/assert'
import {ActionDispatcherBuilder, TypeCheck} from '@flexio-oss/hotballoon'
import {DateExtended} from '@flexio-oss/extended-flex-types'

export class ActionPreviousMonth {
  /**
   * @private
   * @param {ActionDispatcher<PreviousMonth, PreviousMonthBuilder>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionPreviousMonth}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionPreviousMonth:create: `dispatcher` should be a Dispatcher'
    )
    return new ActionPreviousMonth(
      new ActionDispatcherBuilder()
        .type(globalFlexioImport.io.flexio.astrolabe_calendar.actions.PreviousMonth)
        .dispatcher(dispatcher)
        .build()
    )
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Store<SelectedMonth>} storeSelectedMonth
   * @param {ComponentAstrolabePublic} dateGenerator
   * @returns {ActionPreviousMonth}
   */
  listen(componentContext, storeSelectedMonth, dateGenerator) {
    assertType(TypeCheck.isStore(storeSelectedMonth),
      'ActionPreviousMonth:constructor: `storeSelectedMonth` should be a Store'
    )
    assertType(!isNull(this.__action),
      'ActionPreviousMonth:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback(
      /**
       *
       * @param {PreviousMonth} payload
       */
      (payload) => {
        let previousMonth = DateExtended.fromFlexDate(storeSelectedMonth.state().data().month())
        previousMonth.setMonth(previousMonth.getMonth() - 1)
        dateGenerator.addMonth(previousMonth.getFullYear(), previousMonth.getMonth() - 1)
        storeSelectedMonth.set(
          storeSelectedMonth.state().data().withMonth(previousMonth.toLocaleFlexDate())
        )
      },
      componentContext
    )
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<PreviousMonth, PreviousMonthBuilder>}
   */
  action() {
    return this.__action
  }
}
