import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType, isNull} from '@flexio-oss/assert'
import { ActionDispatcherBuilder, ActionDispatcherConfig, ActionTypeConfig, TypeCheck } from '@flexio-oss/hotballoon'
import {DateExtended} from '@flexio-oss/extended-flex-types'

export class ActionNextMonthMaker {
  /**
   * @private
   * @param {ActionDispatcher<NextMonth>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionNextMonthMaker}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionNextMonthMaker:constructor: `dispatcher` should be a Dispatcher'
    )
    let action = ActionDispatcherBuilder.build(
      new ActionDispatcherConfig(
        new ActionTypeConfig(
          globalFlexioImport.io.flexio.astrolabe_calendar.actions.NextMonth,
          /**
           *
           * @param {NextMonth} data
           * @return {NextMonth}
           */
          (data) => {
            return data
          },
          /**
           *
           * @param {NextMonth} payload
           * @return {boolean}
           */
          (payload) => {
            return true
          }
        ),
        dispatcher
      )
    )
    return new ActionNextMonthMaker(action)
  }

  /**
   *
   * @param {Store<StoreSelectedMonth>} storeSelectedMonth
   * @param {ComponentAstrolabePublic} dateGenerator
   * @returns {ActionNextMonthMaker}
   */
  listen(storeSelectedMonth, dateGenerator) {
    assertType(TypeCheck.isStore(storeSelectedMonth),
      'ActionNextMonthMaker:constructor: `storeSelectedMonth` should be a Store'
    )
    assertType(!isNull(this.__action),
      'ActionNextMonthMaker:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback(
      /**
       *
       * @param {NextMonth} payload
       */
      (payload) => {
        let nextMonth = DateExtended.fromFlexDate(storeSelectedMonth.state().data.month())
        nextMonth.setMonth(nextMonth.getMonth() + 1)
        dateGenerator.addMonth(nextMonth.getFullYear(), nextMonth.getMonth() + 1)
        storeSelectedMonth.set(
          storeSelectedMonth.state().data.withMonth(nextMonth.toLocaleFlexDate())
        )
      })
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<NextMonth>}
   */
  action() {
    return this.__action
  }
}
