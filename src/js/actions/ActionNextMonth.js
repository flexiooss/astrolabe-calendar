import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType, isNull} from '@flexio-oss/assert'
import { ActionDispatcherBuilder, TypeCheck } from '@flexio-oss/hotballoon'
import {DateExtended} from '@flexio-oss/extended-flex-types'

export class ActionNextMonth {
  /**
   * @private
   * @param {ActionDispatcher<NextMonth, NextMonthBuilder>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionNextMonth}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionNextMonth:create: `dispatcher` should be a Dispatcher'
    )
    return new ActionNextMonth(
      new ActionDispatcherBuilder()
        .type(globalFlexioImport.io.flexio.astrolabe_calendar.actions.NextMonth)
        .dispatcher(dispatcher)
        .build()
    )
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Store<SelectedMonth>} storeSelectedMonth
   * @param {ComponentAstrolabePublic} dateGenerator
   * @returns {ActionNextMonth}
   */
  listen(componentContext, storeSelectedMonth, dateGenerator) {
    assertType(TypeCheck.isStore(storeSelectedMonth),
      'ActionNextMonth:constructor: `storeSelectedMonth` should be a Store'
    )
    assertType(!isNull(this.__action),
      'ActionNextMonth:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback(
      /**
       *
       * @param {NextMonth} payload
       */
      (payload) => {
        let nextMonth = DateExtended.fromFlexDate(storeSelectedMonth.state().data().month())
        nextMonth.setMonth(nextMonth.getMonth() + 1)
        dateGenerator.addMonth(nextMonth.getFullYear(), nextMonth.getMonth() + 1)
        storeSelectedMonth.set(
          storeSelectedMonth.state().data().withMonth(nextMonth.toLocaleFlexDate())
        )
      },
      componentContext
    )
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<NextMonth, NextMonthBuilder>}
   */
  action() {
    return this.__action
  }
}
