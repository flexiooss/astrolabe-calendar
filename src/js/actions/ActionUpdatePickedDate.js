import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType, isNull} from '@flexio-oss/assert'
import { ActionDispatcherBuilder, TypeCheck } from '@flexio-oss/hotballoon'
import {DateExtended} from '@flexio-oss/extended-flex-types'

export class ActionUpdatePickedDate {
  /**
   * @private
   * @param {ActionDispatcher<UpdatePickedDate, UpdatePickedDateBuilder>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionUpdatePickedDate}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionUpdatePickedDate:create: `dispatcher` should be a Dispatcher'
    )
    return new ActionUpdatePickedDate(
      new ActionDispatcherBuilder()
        .type(globalFlexioImport.io.flexio.astrolabe_calendar.actions.UpdatePickedDate)
        .dispatcher(dispatcher)
        .build()
    )
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Store<DatePicked>} storeDatePicked
   * @param {Store<SelectedMonth>} storeSelectedMonth
   * @param dateGenerator
   * @returns {ActionUpdatePickedDate}
   */
  listen(componentContext, storeDatePicked, storeSelectedMonth, dateGenerator) {
    assertType(TypeCheck.isStore(storeDatePicked),
      'ActionUpdatePickedDate:constructor: `storeDatePicked` should be a Store'
    )
    assertType(!isNull(this.__action),
      'ActionUpdatePickedDate:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback(
      /**
       *
       * @param {UpdatePickedDate} payload
       */
      (payload) => {
        storeDatePicked.set(
          storeDatePicked.state().data()
            .withDate(payload.date())
        )
        let pickedDate = DateExtended.fromFlexDate(payload.date())
        pickedDate.setDate(1)
        pickedDate.setHours(0, 0, 0, 0)
        if (DateExtended.fromFlexDate(storeSelectedMonth.state().data().month()).getMonth() !== pickedDate.getMonth()) {
          dateGenerator.addMonth(pickedDate.getFullYear(), pickedDate.getMonth() + 1)
          dateGenerator.addMonth(pickedDate.getFullYear(), pickedDate.getMonth() - 1)

          storeSelectedMonth.set(
            storeSelectedMonth.state().data()
              .withMonth(pickedDate.toLocaleFlexDate())
          )
        }
      },
      componentContext
    )
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<UpdatePickedDate, UpdatePickedDateBuilder>}
   */
  action() {
    return this.__action
  }
}
