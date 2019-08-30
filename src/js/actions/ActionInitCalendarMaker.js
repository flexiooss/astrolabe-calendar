import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType, isNull} from '@flexio-oss/assert'
import {
  ActionDispatcherBuilder,
  ActionDispatcherConfig,
  ActionTypeConfig,
  TypeCheck
} from '@flexio-oss/hotballoon'
import {DateExtended} from '@flexio-oss/extended-flex-types'

export class ActionInitCalendarMaker {
  /**
   * @private
   * @param {ActionDispatcher<InitCalendar>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionInitCalendarMaker}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionUpdatePickedDateMaker:constructor: `dispatcher` should be a Dispatcher'
    )
    let action = ActionDispatcherBuilder.build(
      new ActionDispatcherConfig(
        new ActionTypeConfig(
          globalFlexioImport.io.flexio.astrolabe_calendar.actions.InitCalendar,
          /**
           *
           * @param {InitCalendar} data
           * @return {InitCalendar}
           */
          (data) => {
            return data
          },
          /**
           *
           * @param {InitCalendar} payload
           * @return {boolean}
           */
          (payload) => {
            return true
          }
        ),
        dispatcher
      )
    )
    return new ActionInitCalendarMaker(action)
  }

  /**
   *
   * @returns {ActionInitCalendarMaker}
   * @param {Store<StoreDatePicked>} storeDatePicked
   * @param {Store<StoreSelectedMonth>}storeSelectedMonth
   * @param {ComponentAstrolabePublic} dateGenerator
   */
  listen(storeDatePicked, storeSelectedMonth, dateGenerator) {
    assertType(TypeCheck.isStore(storeDatePicked),
      'ActionUpdatePickedDateMaker:constructor: `storeDatePicked` should be a Store'
    )
    assertType(TypeCheck.isStore(storeSelectedMonth),
      'ActionNextMonthMaker:constructor: `storeSelectedMonth` should be a Store'
    )
    assertType(!isNull(this.__action),
      'ActionUpdatePickedDateMaker:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback(
      /**
       *
       * @param {InitCalendar} payload
       */
      (payload) => {
        let now = new DateExtended()
        dateGenerator.addMonth(now.getFullYear(), now.getMonth())
        dateGenerator.addMonth(now.getFullYear(), now.getMonth() + 1)
        dateGenerator.addMonth(now.getFullYear(), now.getMonth() - 1)
        storeDatePicked.set(
          storeDatePicked.state().data
            .withDate(now.toLocaleFlexDate())
        )
        now.setDate(1)
        now.setHours(0, 0, 0, 0)
        storeSelectedMonth.set(
          storeSelectedMonth.state().data
            .withMonth(now.toLocaleFlexDate())
        )
      }
    )
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<InitCalendar>}
   */
  action() {
    return this.__action
  }
}
