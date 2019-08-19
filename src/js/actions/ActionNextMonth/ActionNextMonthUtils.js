import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType, isNull} from '@flexio-oss/assert'
import { ActionDispatcherBuilder, ActionDispatcherConfig, ActionTypeConfig, TypeCheck } from '@flexio-oss/hotballoon'
import {DateExtended} from '@flexio-oss/extended-flex-types'

export class ActionNextMonthUtils {
  constructor() {
    this.__action = null
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionNextMonthUtils}
   */
  init(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionNextMonthUtils:constructor: `dispatcher` should be a Dispatcher'
    )
    this.__action = ActionDispatcherBuilder.build(
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
    return this
  }

  /**
   *
   * @param {Store<StoreSelectedMonth>} storeSelectedMonth
   * @param {ComponentAstrolabePublic} dateGenerator
   * @returns {ActionNextMonthUtils}
   */
  listen(storeSelectedMonth, dateGenerator) {
    assertType(TypeCheck.isStore(storeSelectedMonth),
      'ActionNextMonthUtils:constructor: `storeSelectedMonth` should be a Store'
    )
    assertType(!isNull(this.__action),
      'ActionNextMonthUtils:listen: action should be initialize before using it'
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
