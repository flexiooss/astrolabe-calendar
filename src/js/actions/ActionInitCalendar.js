import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType, isNull} from '@flexio-oss/assert'
import {
  ActionDispatcherBuilder,
  TypeCheck
} from '@flexio-oss/hotballoon'
import {DateExtended} from '@flexio-oss/extended-flex-types'

export class ActionInitCalendar {
  /**
   * @private
   * @param {ActionDispatcher<InitCalendar, InitCalendarBuilder>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionInitCalendar}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionInitCalendar:create: `dispatcher` should be a Dispatcher'
    )
    return new ActionInitCalendar(
      new ActionDispatcherBuilder()
        .type(globalFlexioImport.io.flexio.astrolabe_calendar.actions.InitCalendar)
        .dispatcher(dispatcher)
        .build()
    )
  }

  /**
   *
   * @returns {ActionInitCalendar}
   * @param {ComponentContext} componentContext
   * @param {Store<SelectedMonth>}storeSelectedMonth
   * @param {ComponentAstrolabePublic} dateGenerator
   */
  listen(componentContext, storeSelectedMonth, dateGenerator) {
    assertType(TypeCheck.isStore(storeSelectedMonth),
      'ActionNextMonth:constructor: `storeSelectedMonth` should be a Store'
    )
    assertType(!isNull(this.__action),
      'ActionDateChangedPublic:listen: action should be initialize before using it'
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
        now.setDate(1)
        now.setHours(0, 0, 0, 0)
        storeSelectedMonth.set(
          storeSelectedMonth.state().data()
            .withMonth(now.toLocaleFlexDate())
        )
      },
      componentContext
    )
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<InitCalendar, InitCalendarBuilder>}
   */
  action() {
    return this.__action
  }
}
