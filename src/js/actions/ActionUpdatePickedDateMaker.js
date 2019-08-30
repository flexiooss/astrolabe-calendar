import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType, isNull} from '@flexio-oss/assert'
import { ActionDispatcherBuilder, ActionDispatcherConfig, ActionTypeConfig, TypeCheck } from '@flexio-oss/hotballoon'
import {DateExtended} from '@flexio-oss/extended-flex-types'

export class ActionUpdatePickedDateMaker {
  /**
   * @private
   * @param {ActionDispatcher<UpdatePickedDate>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionUpdatePickedDateMaker}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionUpdatePickedDateMaker:constructor: `dispatcher` should be a Dispatcher'
    )
    let action = ActionDispatcherBuilder.build(
      new ActionDispatcherConfig(
        new ActionTypeConfig(
          globalFlexioImport.io.flexio.astrolabe_calendar.actions.UpdatePickedDate,
          /**
           *
           * @param {UpdatePickedDate} data
           * @return {UpdatePickedDate}
           */
          (data) => {
            return data
          },
          /**
           *
           * @param {UpdatePickedDate} payload
           * @return {boolean}
           */
          (payload) => {
            return true
          }
        ),
        dispatcher
      )
    )
    return new ActionUpdatePickedDateMaker(action)
  }

  /**
   *
   * @param {Store<StoreDatePicked>} storeDatePicked
   * @param {Store<StoreSelectedMonth>} storeSelectedMonth
   * @param dateGenerator
   * @returns {ActionUpdatePickedDateMaker}
   */
  listen(storeDatePicked, storeSelectedMonth, dateGenerator) {
    assertType(TypeCheck.isStore(storeDatePicked),
      'ActionUpdatePickedDateMaker:constructor: `storeDatePicked` should be a Store'
    )
    assertType(!isNull(this.__action),
      'ActionUpdatePickedDateMaker:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback(
      /**
       *
       * @param {UpdatePickedDate} payload
       */
      (payload) => {
        console.log(payload.date())
        storeDatePicked.set(
          storeDatePicked.state().data
            .withDate(payload.date())
        )
        let pickedDate = DateExtended.fromFlexDate(payload.date())
        pickedDate.setDate(1)
        pickedDate.setHours(0, 0, 0, 0)
        if (DateExtended.fromFlexDate(storeSelectedMonth.state().data.month()).getMonth() !== pickedDate.getMonth()) {
          dateGenerator.addMonth(pickedDate.getFullYear(), pickedDate.getMonth() + 1)
          dateGenerator.addMonth(pickedDate.getFullYear(), pickedDate.getMonth() - 1)

          storeSelectedMonth.set(
            storeSelectedMonth.state().data
              .withMonth(pickedDate.toLocaleFlexDate())
          )
        }
      })
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<UpdatePickedDate>}
   */
  action() {
    return this.__action
  }
}
