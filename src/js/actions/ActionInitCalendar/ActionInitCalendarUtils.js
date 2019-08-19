import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType, isNull} from '@flexio-oss/assert'
import {
  ActionDispatcherBuilder,
  ActionDispatcherConfig,
  ActionTypeConfig,
  TypeCheck
} from '@flexio-oss/hotballoon'
import {DateExtended} from '@flexio-oss/extended-flex-types'

export class ActionInitCalendarUtils {
  constructor() {
    this.__action = null
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionInitCalendarUtils}
   */
  init(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionUpdatePickedDateUtils:constructor: `dispatcher` should be a Dispatcher'
    )
    this.__action = ActionDispatcherBuilder.build(
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
    return this
  }

  /**
   *
   * @returns {ActionInitCalendarUtils}
   * @param {Store<StoreDatePicked>} storeDatePicked
   * @param {Store<StoreSelectedMonth>}storeSelectedMonth
   * @param {ComponentAstrolabePublic} dateGenerator
   */
  listen(storeDatePicked, storeSelectedMonth, dateGenerator) {
    assertType(TypeCheck.isStore(storeDatePicked),
      'ActionUpdatePickedDateUtils:constructor: `storeDatePicked` should be a Store'
    )
    assertType(TypeCheck.isStore(storeSelectedMonth),
      'ActionNextMonthUtils:constructor: `storeSelectedMonth` should be a Store'
    )
    assertType(!isNull(this.__action),
      'ActionUpdatePickedDateUtils:listen: action should be initialize before using it'
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
