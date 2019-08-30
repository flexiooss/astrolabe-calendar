import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType, isNull} from '@flexio-oss/assert'
import {ActionDispatcherBuilder, ActionDispatcherConfig, ActionTypeConfig, TypeCheck} from '@flexio-oss/hotballoon'
import {DateExtended} from '@flexio-oss/extended-flex-types'

export class ActionPreviousMonthMaker {
  /**
   * @private
   * @param {ActionDispatcher<PreviousMonth>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionPreviousMonthMaker}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionPreviousMonthMaker:constructor: `dispatcher` should be a Dispatcher'
    )
    let action = ActionDispatcherBuilder.build(
      new ActionDispatcherConfig(
        new ActionTypeConfig(
          globalFlexioImport.io.flexio.astrolabe_calendar.actions.PreviousMonth,
          /**
           *
           * @param {PreviousMonth} data
           * @return {PreviousMonth}
           */
          (data) => {
            return data
          },
          /**
           *
           * @param {PreviousMonth} payload
           * @return {boolean}
           */
          (payload) => {
            return true
          }
        ),
        dispatcher
      )
    )
    return new ActionPreviousMonthMaker(action)
  }

  /**
   *
   * @param {Store<StoreSelectedMonth>} storeSelectedMonth
   * @param {ComponentAstrolabePublic} dateGenerator
   * @returns {ActionPreviousMonthMaker}
   */
  listen(storeSelectedMonth, dateGenerator) {
    assertType(TypeCheck.isStore(storeSelectedMonth),
      'ActionPreviousMonthMaker:constructor: `storeSelectedMonth` should be a Store'
    )
    assertType(!isNull(this.__action),
      'ActionPreviousMonthMaker:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback(
      /**
       *
       * @param {PreviousMonth} payload
       */
      (payload) => {
        let previousMonth = DateExtended.fromFlexDate(storeSelectedMonth.state().data.month())
        previousMonth.setMonth(previousMonth.getMonth() - 1)
        dateGenerator.addMonth(previousMonth.getFullYear(), previousMonth.getMonth() - 1)
        storeSelectedMonth.set(
          storeSelectedMonth.state().data.withMonth(previousMonth.toLocaleFlexDate())
        )
      })
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<PreviousMonth>}
   */
  action() {
    return this.__action
  }
}
